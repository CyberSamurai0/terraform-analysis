terraform {
    required_providers {
        vultr = {
            source = "vultr/vultr"
            version = "2.26.0"
        }
    }
}

# Configure Provider
provider "vultr" {
    # API Key specified via VULTR_API_KEY environment variable
}

resource "vultr_startup_script" "ProvisionScript" {
    name = "Terraform Demo Provisioning"
    script = base64encode(file("provision.sh"))
    type = "boot"
}

data "vultr_os" "Ubuntu" {
    filter {
        name = "name"
        values = ["Ubuntu 22.04 LTS x64"]
    }
}

resource "vultr_instance" "terraform-instance" {
    # Region: Seattle, Washington
    region = "sea"

    # Instance type: 1 vCPU, 1 GB RAM, 25 GB SSD, $5.00/month ($0.007/hour)
    plan = "vc2-1c-1gb"

    # Ubuntu 22.04 LTS x64
    os_id = coalesce(vultr_os.Ubuntu.id, 1743)

    # Configure Hostname
    hostname = "terraform-instance"

    # Configure Label (Display Name)
    label = "terraform-instance"

    # Disable Automatic Backups
    backups = "disabled"

    # Disable DDOS Protection
    ddos_protection = false

    # Disable IPv6
    enable_ipv6 = false

    # Startup Script
    script_id = vultr_startup_script.ProvisionScript.id

    # Define Tags for the Instance
    tags = ["terraform"]
}