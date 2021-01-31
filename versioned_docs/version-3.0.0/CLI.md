---
id: CLI
title: CLI
sidebar_label: CLI
---

## Options

| Option                   | Argument      | Default       | Description                                                                                                         |
| :----------------------- | :------------ | :------------ | :------------------------------------------------------------------------------------------------------------------ |
| -h                       |               |               | help output usage information                                                                                       |
| -v, --version            |               |               | returns Runnerty version                                                                                            |
| -c, --config             | path          | ./config.json | Overwrite path file config                                                                                          |
| -p, -P, --plan           | path          | ./plan.json   | Overwrite path file plan of config file                                                                             |
| -m, --memorylimit        | memoryLimitMb |               | Set default memory space limit for Runnerty (--max-old-space-size). It is necessary to restart Runnerty             |
| -f, --force_chain_exec   | chainId       |               | Force chain execution                                                                                               |
| -fd, --forceDependents   |               |               | It should be indicated in case you want the chains that depend on the forces to be executed (For development tests) |
| --end                    |               |               | End runnerty on force chain execution (-f)                                                                          |
| --input_values           | inputValues   |               | Input values for force chain execution (-f)                                                                         |
| --custom_values          | customValues  |               | Custom values for force chain execution (-f)                                                                        |
| --config_user            | userName      |               | User for remote (url) config file (Basic Auth User)                                                                 |
| --config_password        | password      |               | Password for remote (url) config file (Basic Auth Password)                                                         |
| -n, --namespace          | namespace/s   |               | Enable the chains of the indicated namespace. It is possible to set a list of comma separated items                 |
| -en, --exclude_namespace | namespace/s   |               | Disable the chains of the indicated namespace. It is possible to set a list of comma separated items                |

### Samples

```bash
runnerty -c /etc/runnerty/config.json -p /user/workdir/other_plan.json -f CHAIN_ONE --custom_values {\"YYYY\":\"1986\"} --end
```

```bash
runnerty -c /etc/runnerty/config.json -p /user/workdir/other_plan.json -f CHAIN_ONE -fd --custom_values '{"YYYY":"1986"}' --end
```

```bash
runnerty -c /etc/runnerty/config.json -p /user/workdir/other_plan.json -f CHAIN_ONE --custom_values '{"YYYY":"1986"}' --input_values '[{"KEY_1":"1-1", "KEY_2":"1-2"},{"KEY_1":"2-1", "KEY_2":"2-2"}]' --end
```
