variable "vpc_cidr" {
    type = "string"
    description = "CIDR BLOCK"
    default = "10.0.0.0/16"
}

variable "name" {
    type = "string"
    description = "VPC name"
    default = "platform-project"
}

variable "availability" {
    type = list (string)
    default = ["us-east-1a", "us-east-1b" ]

}

variable "public_subnet_cidr" {
    type = list (string)
    default = ["10.0.11.0/24" "10.0.12.0/24" ]
}

variable "private_subnet_cidr"{
    type = list (string)
    default = ["10.0.21.0/24" "10.0.22.0/24 ]
}

