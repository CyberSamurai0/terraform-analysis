import * as pulumi from "@pulumi/pulumi";

import * as vultr from "@ediri/vultr";

vultr.getInstances({
    filters: [{
        name: "status",
        values: ["active"],
    }],
}).then((instances) => {
    instances.instances.forEach((instance) => {
        console.log(`Instance ID: ${instance.id}, Status: ${instance.status}`);
    });
});