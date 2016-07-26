These plugins extended the functionality of the basic BaasBox installation. The plugins were available on the `/plugin/instapp.enabled` and `/plugin/instapp.toggle` endpoints, for example.

- `instapp.enabled` was used by the SDN controller to check if a metering unit was enabled for reading or not. The contoller checked for this information on a timeout of 30 seconds.
- `instapp.toggle` provided the means of setting the `enabled` status.
- `library.shared` had methods and parameters that were used by the other plugins.
- `portal.restartKamu` provided functionality for restarting a KaMU.
- `portal.updateProfile` allowed to set a different profile for a KaMU.
- `portal.updateSoftware` made it possible to change the version of the software used by a KaMU.

Even though the official way of adding plugins to BaasBox was through the web console it was possible to send plugins in through the REST API. A rudimentary script is provided in this folder. It could be used as a starting point for making a script that could initialize the database with plugins and data. See [this script](https://github.com/IoTitude/docker_test_env/blob/master/baasbox_test/scripts/data.sh) for an example.
