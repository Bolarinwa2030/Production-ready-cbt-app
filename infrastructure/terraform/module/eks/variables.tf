variable "cluster_name" {
    type = string
    description = "The EKS_Cluster Name"
}

variable "kubernetes_version" {
    description = "Kubernetes version use for this project"
    type = string
    deafult = "1.32"
}

variable "private_subnet_ids" {
    description = "List of Private subnet IDS from the VPC"
    type = list(string)
}

variable "node_group_system_instance_type" {
    description = "EC2 instance type for System node group"
    type = string
    default = "t3.medium
}

variable "node_group_app_instance_type" {
    description = "EC2 instance type for App node group"
    type = string
    deafult = "t3.medium
}

