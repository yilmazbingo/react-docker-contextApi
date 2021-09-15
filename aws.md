- ec2 allows us to create virtual servers on the cloud, store data on virtual drivers (EBS),distributing load across machines(ELB:load balancing),scaling the services using an auto-scaling group (AKG). when you create an instance, first thing we choose AMI, Amazon Machine Image. use Amazon Linux2 Ami. click on "Next:Configure Instance Details" and make sure "vpc----" network is created. Then click on launch, you will be prompted to create a key-pair to connect the instance via ssh and run commands on it. go to instance and click "connect". in "SSH" client you will see the commands to execute
  `chmod 400 react-spa.pem` // Gives the user read permission, and removes all other permission
  `ssh -i "react-spa.pem" ec2-user@ec2-34-229-161-210.compute-1.amazonaws.com` // run this where permission file is

## Install Docker on a Virtual Machine

`sudo yum update -y`
`sudo amazon-linux-extras install docker`
`sudo service docker start`

## Pushing Our local Image to the Cloud

we have 2 options
1- we deploy source code to aws and then we build it there. this has alot of unnecessary complexity. there is no advantage
2- we build in our local machine and then we deploy that built image. we are gonna push our image to docker hub. create a repo and with the same name create the image in local machine.
`docker build -t yilmazito/react-webpack-spa-shopping .`
`sudo docker login`
`sudo docker push yilmazito/react-webpack-spa-shopping`

- we dont use bind mounts in production.

## Running and Publishing App

`sudo docker run -d -it --rm -p 80:8080 yilmazito/react-webpack-spa-shopping` //wds at 8080
`sudo docker ps`
go to EC2 instance and check the ipv4 Public ip. At this moment if I run this it wont connect. this is a security feature. by default, your instance is basically disconnected from eveything. I can connect only with ssh. this is controlled with security group. choose the instance, in security, you can see which security group it has been added. this group controls which traffic is allowed on our EC2 instance. check inbound and outbound rules. outbound rules control which traffic is allowed from the instance to somewhere else. by default everything is allowed. thats why `docker run` worked and installed image from docker hub. EC2 was allowed to connect to dockerhub. But for inbound rules, there is only port 22 is open which is the ssh port. Source `0.0.0.0/0` says it is open to everyone. that is why key file is important. only owner of these keys can access. Alternatively you could narrow down the source to your local machine's ip. But we need to allow HTTP to go in this instance which is listening to port 3000. Edit inbound rules, add Http, default port is 80, source is anywhere

## Managing and Updating App

Rebuild the image and push it to dockerhub again. use this updated server on remote server. Whenever you `docker run`, it checks whether it already has this image locally. it does not check if there is more updated remote image available.

- image should be same as the repo name in dockerhub
  `MAKE SURE YOU REBUILD THE IMAGE`
  `sudo docker pull yilmazito/react-webpack-spa-shopping`
  `sudo docker run -d -it --rm -p 80:8080 yilmazito/react-webpack-spa-shopping`

IN this approach of deployment, we are responsible for everything.

NOTE: When you stop and then start an EC2 instance, it can change its public Ip. If you need to have a fixed pubic IP, you need an ELASTIC IP. Not recommended

## Route 53

it is a managed dns system. DNS is a collection of rules and records which helps clients understand how to reach a server through its domain name. DNS records act as instructions for the DNS server, so it knows which domain names each IP address is associated with. DNS records contain a lot of different syntax and commands for how the server should respond to the request.
-A: maps hostname to IpV4

- AAAA: hostname to IpV6
- CNAME: maps hostname to another hostname
- Alias: maps hostname to AWS resource
-

- region is a cluster of data centers. most aws services are region-scoped. you can use a service in a specific region and if you use a same service in another region, you will not have your data. each region can have many availability zones AZ. usually 3 AZ per region, min 2, max 6. Each Az is one or more discrete data centers. All AZ's are separated from each other. they are still connected with high bandwith, ultra-low latency networking. We have connectivity between all available zones. Low latency describes a computer network that is optimized to process a very high volume of data messages with minimal delay (latency.
- Roles are in IAM, we give them to machines. Users is for a physical person, and roles is going to be for a machine. Policies are JSON and defines what Users, Groups, ROles can and cannot do. IAM has a global view. When you create a user, group or a role, it will be across all the regions. IAM has predefined policies. give users the minimal amount of permission -least-privilege-principles. IAM Federation is for big enterprises, they integrate their own repository of users with IAM. Identity Federation uses SAML standard.
- 1 IAM role per app. each app has its own lifecycle.
- add user with programmatic access and aws management console. Set autogenerated password and can send it to the user, so user can chage it upon login. Next, choose attach existing policies directly, and i will give myself admin access. Also in this step use default "create user without a permissions boundary". after creating the user, download the security credentials. create "admins" group and add "yilmaz". if you go to users/permissions you see there are two permissions are attached to user "yilmaz". since they are managable I delete them. In Account settings you can change the password policy.

## Managed Services AWS ECS

we have been manually running our ec2 instance we might wanna use a managed service. ECS stands for ELASTIC CONTAINER SERVICE. we dont use "docker" command anymore but we use tools that cloud providers give us.
