---
id: CLI
title: CLI
sidebar_label: CLI
---

Starting with version `3.2`, Runnerty incorporates the tools previously offered in `runnerty-cli`.

## Options

| Option            | Argument | Default | Description              |
| :---------------- | :------- | :------ | :----------------------- |
| -h, --help        |          |         | display help for command |
| -v, -V, --version |          |         | returns Runnerty version |

## Commands

| Command          | Argument                                          | Description                             |
| :--------------- | :------------------------------------------------ | :-------------------------------------- |
| run              | [options](CLI.md#run-options)                     | run a project. Default command          |
| new, n           | [options](CLI.md#new-options) projectName         | create a new project                    |
| add, a           | [options](CLI.md#add-options) module              | add runnerty module                     |
| migrate-cron, mc | [projectName](CLI.md#migrate-crontab) crontabPath | migrate crontab to new runnerty project |
| help             | [command]                                         | display help for command                |

:::tip TIP
If no command is indicated, the `run` command will be executed, this makes version `3.2` compatible with previous versions.
:::

### Run options

| Option                           | Argument       | Default       | Description                                                                                                                             |
| :------------------------------- | :------------- | :------------ | :-------------------------------------------------------------------------------------------------------------------------------------- |
| -h, --help                       |                |               | help output usage information                                                                                                           |
| -c, --config                     | path           | ./config.json | Overwrite path file config                                                                                                              |
| -p, -P, --plan                   | path           | ./plan.json   | Overwrite path file plan of config file                                                                                                 |
| -f, --force_chain_exec           | chainId        |               | Force chain execution (For development tests). It is possible to set a list of comma separated items                                    |
| -fp, --force_process             | proccessId     |               | Force process execution. You must also indicate the chain_id. For development tests).                                                   |
| -fd, --force_chain_dependents    |                |               | It should be indicated in case you want the chains that depend on the forced chains to be executed (For development tests).             |
| -fpd, --force_process_dependents |                |               | It should be indicated in case you want the processes that depend on the forced processes to be executed (For development tests).       |
| --input_values                   | inputValues    |               | Input values for force chain execution (-f) (For development tests): --input_values '[{"iter1V1":"A","iter1V2":"B"},{"iter21":"1",...]' |
| --end                            |                |               | End runnerty on force chain execution (-f) (For development tests).                                                                     |
| --custom_values                  | customValues   |               | Custom values for force chain execution (-f) (For development tests): --custom_values '{"customValue_1":"v1",...}'                      |
| --config_user                    | configUser     |               | User for remote (url) config file (Basic Auth User)                                                                                     |
| --config_password                | configPassword |               | Password for remote (url) config file (Basic Auth Password)                                                                             |
| -n, --namespace                  | namespace      |               | Enable the chains of the indicated namespace. It is possible to set a list of comma separated items                                     |
| -en, --exclude_namespace         | namespace      |               | Disable the chains of the indicated namespace. It is possible to set a list of comma separated items                                    |
| --env-file                       | env file path  | ./.env        | Reading environment variables from the path of the specified file                                                                       |
| -h, --help                       |                |               | display help for command                                                                                                                |

#### Samples

```bash
runnerty -c /etc/runnerty/config.json -p /user/workdir/other_plan.json -f CHAIN_ONE --custom_values {\"YYYY\":\"1986\"} --end
```

```bash
runnerty -c /etc/runnerty/config.json -p /user/workdir/other_plan.json -f CHAIN_ONE -fd --custom_values '{"YYYY":"1986"}' --end
```

```bash
runnerty -c /etc/runnerty/config.json -p /user/workdir/other_plan.json -f CHAIN_ONE --custom_values '{"YYYY":"1986"}' --input_values '[{"KEY_1":"1-1", "KEY_2":"1-2"},{"KEY_1":"2-1", "KEY_2":"2-2"}]' --end
```

```bash
runnerty -f CHAIN_ONE -fd --end
```

```bash
runnerty -f CHAIN_ONE -fd -fp PROCESS_ONE -fpd --end
```

### New options

| Option          | Description                        |
| :-------------- | :--------------------------------- |
| -h, --help      | help output usage information      |
| -sg, --skip_git | do not initialize a git repository |

#### Samples

```bash
runnerty new my_runnerty_project
```

```bash
runnerty new my_runnerty_project -sg
```

### Add options

| Option                  | Argument    | Description                               |
| :---------------------- | :---------- | :---------------------------------------- |
| -h, --help              |             | help output usage information             |
| -c, --config            | configPath  | set config.json path to add module.       |
| -p, --package           | packagePath | set package.json path to add module.      |
| -ws, --without_scaffold | packagePath | do not include scaffolding in add module. |

#### Samples

```bash
runnerty add @runnerty/executor-shell
```

```bash
runnerty add own_excutor -ws
```

### Migrate crontab

| Option     | Description                   |
| :--------- | :---------------------------- |
| -h, --help | help output usage information |

#### Samples

```bash
runnerty migrate-cron my_runnerty_migrated_project
```

```bash
runnerty mc my_runnerty_migrated_project /usr/lib/cron/tabs/my_user
```
