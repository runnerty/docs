---
id: config
title: Configuration
sidebar_label: Configuration
---

## config.json

The general configuration and params of the workflows is set in the config.json file. Runnerty will try to get the config.json file in the actual path.

With the `-c` param it is possible to indicate a different path.

```bash
runnerty -c /path/config.json
```

The `config.json` file contains the configuration for the different triggers, executors, notifiers and global values (params, paths, files, etc.) which are going to be used on the processes:

```json
{
  "triggers": [
    {
      "id": "schedule_default",
      "type": "@runnerty-trigger-schedule"
    },
    {
      "id": "filewatcher_default",
      "type": "@runnerty-trigger-file-watcher"
    }
  ],
  "executors": [
    {
      "id": "shell_default",
      "type": "@runnerty-executor-shell"
    }
  ],
  "notifiers": [
    {
      "id": "telegram_default",
      "type": "@runnerty/notifier-telegram",
      "token": "MyTokenId",
      "chat_id": "MyChatId"
    }
  ]
}
```

## Triggers

Triggers are plugins which cause the execution of a chain.

The most common case is the schedule trigger which allows us to execute a chain with a periodicity like CRON.

Another example is the file watcher trigger. This trigger let us to execute a chain based on the events defined over a directory or file.
Have a look at: [triggers](triggers.md).

## Servers

Servers allow us to abstract ourselves of the endpoints implementation in a trigger development. Runnerty will set the servers indicated in the config file. It will take care about the routing and will serve one property for the triggers (`on_request`). In this property it will receive the requests of the endpoint. Moreover it allows customization of the response, also the status code and the possibility to send an object.

Have a look at: [triggers](triggers.md).

## Executors

Executors are plugins which enclose functionalities. These plugins allow Runnerty to execute processes, data bases operations, use external services, etc. There is a list of the official available [here](plugins.md).

The `config.json` is used to define all the executors that are going to be used in the whole plan.

This is an example of the configuration of two executors (`shell` and `mysql`):

```json {4,5,8,9}
{
  "executors": [
    {
      "id": "shell_default",
      "type": "@runnerty-executor-shell"
    },
    {
      "id": "mysql_default",
      "type": "@runnerty-executor-mysql",
      "user": "mysqlusr",
      "password": "mysqlpass",
      "database": "MYDB",
      "host": "myhost.com",
      "port": "3306"
    }
  ]
}
```

## Notifiers

Notifiers are plugins which allows Runnerty to notificate events that happen in the chain and processes to different services and channels. This is a list of the official available [plugins](plugins.md).

The `config.json` file contains all the notifiers that are going to be used in the whole plan.

This is an example of the configuration of two notifiers (`mail` and `telegram`):

```json {4,5,10,11}
{
  "notifiers": [
    {
      "id": "telegram_default",
      "type": "@runnerty/notifier-telegram",
      "token": "MyTokenId",
      "chat_id": "MyChatId"
    },
    {
      "id": "mail_default",
      "type": "@runnerty/notifier-mail",
      "disable": false,
      "from": "Runnerty Notifier <my@sender.com>",
      "transport": "smtp://my%mailsender.com:pass@smtp.host.com/?pool=true",
      "bcc": ["mycc@mail.com"],
      "templateDir": "/etc/runnerty/templates",
      "template": "alerts",
      "ejsRender": true
    }
  ]
}
```

## Defaults

It allows us to define at the project level, `notifications` and `output` configurations of both chains and processes.

:::note
The same can be done at the chain level for process defaults with [defaults_processes](defaults-processes.md)
These values can be overwritten in the properties of the chain itself, in [defaults_processes](defaults-processes.md) or in the properties of a process.
:::

```json {2,3,4,26,27,48}
{
  "defaults": {
    "chain": {
      "notifications": {
        "on_start": [
          {
            "id": "console_default",
            "message": "@GETDATE('YYYY-MM-DD HH:mm:ss') START OF THE CHAIN: @GV(CHAIN_ID)"
          }
        ],
        "on_end": [
          {
            "id": "console_default",
            "message": "@GETDATE('YYYY-MM-DD HH:mm:ss') END OF THE CHAIN: @GV(CHAIN_ID)"
          }
        ],
        "on_fail": [
          {
            "id": "console_default",
            "message": "@GETDATE('YYYY-MM-DD HH:mm:ss') FAIL OF THE CHAIN: @GV(CHAIN_ID)",
            "mode": "error"
          }
        ]
      }
    },
    "process": {
      "notifications": {
        "on_start": [
          {
            "id": "console_default",
            "message": "@GETDATE('YYYY-MM-DD HH:mm:ss') START: PROCESS @GV(PROCESS_ID)"
          }
        ],
        "on_fail": [
          {
            "id": "console_default",
            "message": "@GETDATE('YYYY-MM-DD HH:mm:ss') ERROR: PROCESS @GV(PROCESS_ID): @GV(PROCESS_EXEC_ERR_OUTPUT)",
            "mode": "error"
          }
        ],
        "on_end": [
          {
            "id": "console_default",
            "message": "@GETDATE('YYYY-MM-DD HH:mm:ss') END: PROCESS @GV(PROCESS_ID): @GV(PROCESS_EXEC_MSG_OUTPUT)"
          }
        ]
      },
      "output": [
        {
          "file_name": "@GV(LOGS_PATH)/@GETVALUE(PROCESS_ID).log",
          "write": [
            "EXECUTION @GV(PROCESS_ID) - AT @GETDATE('YYYY-MM-DD HH:mm:ss')\n @GV(PROCESS_EXEC_ERR_OUTPUT) @GV(PROCESS_EXEC_MSG_OUTPUT)"
          ],
          "concat": true,
          "maxsize": "10mb"
        }
      ]
    }
  }
}
```

## Global Values

It is possible to define values that can be used in the chains an process (paths, files, data, …):

```json {4}
{
  "executors": [{ "...": "..." }],
  "notifiers": [{ "...": "..." }],
  "global_values": [
    {
      "my_files": {
        "file_one": "/path/MYFILE_ONE.csv",
        "file_one": "/path/MYFILE_TWO.csv"
      },
      "my_values": {
        "value_one": "VALUE_ONE",
        "value_two": "VALUE_TWO"
      }
    }
  ]
}
```

These values can be used in the whole plan (chains and proccess) referencing them. Runnerty has also some default values. Have a look at: [Global values](values.md/#global-values).

## Runnerty Platform connection

[Runnerty Platform](https://app.runnerty.io/) offers a platform to manage your runnerty projects, visualize your chains and processes in real time and much more.

#### Access [Runnerty Platform](https://app.runnerty.io/) and create your project:

![](./assets/runnerty-io-new-project.png)

Get your project's API Key:

![](./assets/runnerty-io-api-key.png)

```json {4} title="Enter the API Key in the configuration file of your runnerty project (config.json)"
{
  "general": {
    "runnerty.io": {
      "apikey": "YOUR_APIKEY_HERE!"
    }
  }
}
```

In the next start of your project you will be able to visualize and control your processes and chains from Runnerty Platform.

#### Parameters

| Parameter     | Default                  | Description                                                               |
| :------------ | :----------------------- | :------------------------------------------------------------------------ |
| disable       | false                    | disable Runnerty Platform connection                                      |
| host          | ws-telemetry.runnerty.io | Runnerty Platform enpoint                                                 |
| healthChecker | true                     | enables health signal communication                                       |
| remoteControl | true                     | enable remote control from Runnerty platform                              |
| debug         | false                    | enables the debug mode of the communication module (for development only) |

## Other general configuration parameters

| Parameter     | Default               | Description                                                   |
| :------------ | :-------------------- | :------------------------------------------------------------ |
| planFilePath  | plan.json             | path to plan file                                             |
| modulesPath   | ./ (config file path) | path containing the node_modules directory with the plugins   |
| executorsPath | modulesPath value     | path containing the node_modules directory with the executors |
| notifiersPath | modulesPath value     | path containing the node_modules directory with the notifiers |
| triggersPath  | modulesPath value     | path containing the node_modules directory with the triggers  |
