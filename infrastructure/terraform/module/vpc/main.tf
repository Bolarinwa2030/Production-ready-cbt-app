resource "aws_vpc" "vpc" {
    cidr_block = var.vpc_cidr
    enable_dns_hostnames = true
    enable_dns_support = true

    tags = {
        Name = var.name
    }
}

# PUBLIC SUBNET where LB lives
resource "aws_subnet" "public" {
    count = 2
    vpc_id = aws_vpc.vpc.id
    cidr_block = var.public_subnet_cidr[count.index]
    availability_zone = var.availability[count.index]

    map_public_ip_on_launch = true 

    tags = {
        Name = "${var.name}-public-${count.index +1 }"
        "kubernetes.io/role/elb" = "1"
    }

}

resource "aws_subnet" "private" {
    count = 2
    vpc_id = aws_vpc.vpc.id
    cidr_block = var.private_subnet_cidr[count.index]
    availability_zone = var.availability[count.index]


    tags = {
        Name = "${var.name}-private-${count.index + 1}"
        "kubernetes.io/role/internal-elb" = "1"
    }
}

resource "aws_internet_gateway" "igw" {
    vpc_id = aws_vpc.vpc.id

    tags = {
        Name = "${var.name}-igw-"
    }
}

resource "aws_eip" "nat" {
    count = 2
    domain = "vpc"
}

resource "aws_nat_gateway" "natgateway" {
    count = 2
    allocation_id = aws_eip[count.index].id
    subnet_id = aws_subnet.public[count.index].id

    tags = { 
        Name = ${var.name}-nat-${count.index + 1}

    }
}

# ROUTE TABLE
resource "aws_route_table" "public" {
    vpc_id = aws_vpc.vpc.id

    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.igw.id
    }

    tags = {
        Name = ${var.name}-public-rt"
    }
} 

resource "aws_route_table" "private" {
    count = 2
    vpc_id = aws_vpc.vpc.id 

    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_nat_gateway.natgateway[count.index].id
    }
    tags = {
        Name = ${var.name}-private-rt-${count.index +1}
    }
}

#ASSOCIATING THE ROUTE TABLE

resource "aws_route_table_association" "public" {
    count = 2
    subnet_id = aws_subnet.public[count.index].id
    route_table_id = aws_route_table.public.id 
}

resource "aws_route_table_association" "private" {
    count = 2
    subnet_id = aws_subnet.private[count.index].id
    route_table_id = aws_route_table.private[count.index].id
}

# SECURITY GROUP 
resource "aws_security_group" "web_sg" {
    name = "web-server-sg"
    vpc_id = aws_vpc.vpc.id
    description = "Security group for platform project"

    tags = {
        Name = "${var.name}-plaform-web-sg"
    }

}

# Inbound Rule allowing only the https/http 
resource "aws_vpc_security_group_ingress_rule" "allow_http" {
  security_group_id = aws_security_group.web_sg.id
  description       = "Allow HTTP traffic from anywhere"
  
  cidr_ipv4   = "0.0.0.0/0"
  from_port   = 80
  ip_protocol = "tcp"
  to_port     = 80
}

resource "aws_vpc_security_group_ingress_rule" "allow_https" {
    security_group_id = aws_security_group.web_sg.id
    description = "Allow HTTPs traffic from anywhere"


    cidr_ipv4 = "0.0.0.0/0"
    from_port = 443
    ip_protocol = "tcp"
    to_port = 443
}

resource "aws_vpc_security_group_egress_rule" "web_to_workers" {
  security_group_id            = aws_security_group.web_sg.id
  referenced_security_group_id = aws_security_group.worker_sg.id
  ip_protocol                  = "tcp"
  from_port                    = 8080 
  to_port                      = 8080
}

# WORKER SECURITY GROUP
resource "aws_security_group" "worker_sg" {
    name = "worker_node_sg"
    vpc_id = aws_vpc.vpc.id 
    description = "Security Group for Worker Node"

    tags = {
        Name = "${var.name}-platform-worker-sg"
    }
}

resource "aws_vpc_security_group_ingress_rule" "allow_web_sg" {
    security_group_id = aws_security_group.worker_sg.id 
    referenced_security_group_id = aws_security_group.web_sg.id 

    ip_protocol = "tcp"
    from_port = 8080
    to_port = 8080
}

# Outbound: ONLY traffic heading to the PostgreSQL Security Group
resource "aws_vpc_security_group_egress_rule" "workers_to_db" {
  security_group_id            = aws_security_group.worker_sg.id
  referenced_security_group_id = aws_security_group.postgres_sg.id
  ip_protocol                  = "tcp"
  from_port                    = 5432
  to_port                      = 5432
}

# POSTGRESS SECURITY GROUP
 resource "aws_security_group" "postgres_sg" {
    name = "postgress_db_sg"
    vpc_id = aws_vpc.vpc.id

    description = "Allow communication to Worker Node"

    tags = {
        Name = "${var.name}-platform-postgress-sg"
    }
 }

 resource "aws_vpc_security_group_ingress_rule" "db_to_workers" {
    security_group_id = aws_security_group.postgress_sg.id
    referenced_security_group_id = aws_security_group.worker_sg.id

    ip_protocol = "tcp"
    from_port = 5432
    to_port = 5432
 }