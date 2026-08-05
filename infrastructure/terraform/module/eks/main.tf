resource "aws_eks_cluster" "main"{
    name = var.cluster_name
    role_arn = aws_iam_role.cluster.arn
    version = var.kubernetes_version

vpc_config {
    subnet_ids = var.private_subnet_ids
    endpoint_private_access = true
    endpoint_public_access = true
    }
 depends_on = [
    aws_iam_role_policy_attachment.cluster_policy
 ]
}

#OpenID COnnect: Allowing pods to get AWS PERMISSION
data "tls_certificate" "eks" {
    url = aws_eks_cluster.main.identity[0].oidc[0].issuer
}
resource "aws_iam_openid_connect_provider" "eks" {
    client_id_list =["sts.amazonaws.com" ]
    thumbprint_list = [data.tls_certificate.eks.certificates[0].sha1_fingerprint]
    url = aws_eks_cluster.main.identity[0].oidc[0].issuer 
}

#ROLE FOR THE CLUSTER CONTROL
# EKS CLuster needs permission to manage AWS resources
resource "aws_iam_role" "cluster" {
    name = "${var.cluster_name}-cluster-role"

    asumme_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [{
            Effect = "Allow"
            Principal = { Service = "eks.amazonaws.com" }
            Action = "sts:AssumeRole"
        }]
    })
}
resource "aws_iam_role_policy_attachment" "cluster_policy" {
    role = aws_iam_role.cluster.name
    policy_arn = "arn:aws:iam:aws:policy/AmazonEKSClusterPolicy"
}

# WORKER Node
# The EC2 server that run pods will need AWS permission to pull image from ECRr
resource "aws_iam_role" "node" {
    name = "${var.cluster_name}-node-role"

    asumme_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [{
            Effect = "Allow"
            Principal = {Service = "ec2.amazonaws.com" }
            Action = "sts:AssumeRole"
        }]
    })
}
resource "aws_iam_role_policy_attachment" "node_policies" {
    for_each = toset([
        "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy",  #Let node join cluster
        "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy",  #Networking for pods
        "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
    ])
    role = aws_iam_role.node.name
    policy_arn = each.value
}


# THE worker NODE 

resource "aws_eks_node_group" "system" {
    cluster_name = aws_eks_cluster.main.name
    node_group_name = "system"
    node_role_arn = aws_iam_role.node.arn
    subnet_ids = var.private_subnet_ids 
    instance_types = [var.node_group_system_instance_type]

    scaling_config {
        desired_size = 2
        min_size = 1
        max_size = 3
    }

    taint {
        key = "dedicated"
        value = "system"
        effect = "NO_SCHEDULE"
    }
    labels = {
        role = "system"
    }
    depends_on = [aws_iam_role_policy_attachment.node_policies]
}

resource "aws_eks_node_group" "app" {
    cluster_name = aws_eks_cluster.main.name
    node_group_name = "app"
    node_role_arn = aws_iam_role.node.arn
    subnet_ids = var.private_subnet_ids
    instance_types = [var.node_group_app_instance_type]

    scaling_config {
        desired_state =2
        min_size = 1
        max_size = 3
    } 
    labels = {
        role = "app"
    }
    depends_on = [aws_iam_role_policy_attachment.node_policies]
}