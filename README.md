# BaasBox

[BaasBox](http://www.baasbox.com) back-end for the IoTCity service. The version used in this project was 0.9.5.

The back-end provided a common back-end for many of the key services of the project. Instapp, Portal, AdminKaMU, KaMU and SDNcontroller all used the same back-end. Main purpose of the BaasBox back-end was to have a single place for KaMU information and user data.

<!-- MDTOC maxdepth:6 firsth1:2 numbering:0 flatten:0 bullets:0 updateOnSave:1 -->

[Installation](#installation)   
[How it was setup](#how-it-was-setup)   
&emsp;[Collections](#collections)   
&emsp;[Users](#users)   
&emsp;[Roles](#roles)   
&emsp;[Plugins](#plugins)   
&emsp;[Metering unit JSON format](#metering-unit-json-format)   
[Docker](#docker)   

<!-- /MDTOC -->

## Installation

- Download your BaasBox zip file from the official site.
- Unzip
- Run the `start.sh` script

## How it was setup

The data was stored on BaasBox and it's noSQL OrientDB. The data was split into collections and documents. The storage format was JSON.

### Collections

| Collection | Description | Permissions |
| :--- | :--- | :--- |
| Master | Holds all KaMU information of a city | AdminKaMU: RW, Office Installer: RW |
| Admin | Holds a list of AdminKaMU hashes | KaMU: R |
| TaskList | Field Installer specific task list | Office Installer: RW, Field Installer: R |
| Profile | A collection of available profiles | Office Installer: RW |
| Version | A collection of available versions | Office Installer: RW |

These collections were implemented discluding the TaskList.

### Users

| User | Description | Permissions |
| :--- | :--- | :--- |
| KaMU | Common user for metering units | AdminHash: read |
| AdminKaMU | Admin software for controlling KaMUs | Master: read/write |
| Office Installer |  | Master: read/write, TaskList(s), read/write (create) |
| Field Installer |  | TaskList: read |

It was planned that these users could be present in the prototype. In this proof of concept implementation the default admin user was used throughout.

### Roles

Roles could have been the same as users. Different roles were not implemented during this project.

### Plugins

Plugins were used to further expand the capabilities of BaasBox and to provide special functionality for out project. For further information look in to the plugins folder.

### Metering unit JSON format

```json
{
  "mac": "the-mac-address",
  "hash": "hash-for-kaa",
  "installer": "name-of-installer",
  "installationDate": "date-of-installation",
  "address": "location-of-installation",
  "location": {
    "long": "longitude",
    "lat": "latitude"
  },
  "sensorHeight": 0,
  "enabled": false,
  "status": 1,
  "swVersion": "version-of-current-software",
  "sensors": [],
  "activeProfile": "profile"
}
```

* `sensor-height` in millimeters. Entered on installation.
* `enabled` was the metering unit enabled for reading
* `status` metering unit status; running, battery low, etc...
* `sensors` list of sensors used by the KaMU


## Docker

The dockerfiles in the repo provided a dockerized version of the BaasBox service. Main image was for running the service while a separate data container made it possible to persist the data if the main service was shutdown. They were added to the Docker Hub with automatic building:

- [iotitude/baasbox](https://hub.docker.com/r/iotitude/baasbox/)
- [iotitude/baasbox-data](https://hub.docker.com/r/iotitude/baasbox-data/)

BaasBox was setup on Rancher with the commands in the docker-compose.yml file.
