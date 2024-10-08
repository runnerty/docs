---
id: setup-create-project
title: 1. Create a project
---

1. Install runnerty

```bash npm2yarn
npm i -g runnerty
```

2. Let's create the project, execute this command in your terminal.

```bash npm2yarn
runnerty new my-first-runnerty-project
```

The following contents will be created in your current directory.

```sh
└── my-first-runnerty-project/
    ├── config.json
    ├── package.json
    ├── plan.json
    └── chains/
        └── chain-one.json
```

3. Run `runnerty` or `runnerty run`.

🎉🎉 Congratulations, you have just made your first Runnerty project!

You can know connect to [Runnerty Platform](connect-to-platform).

This workflow executes an `echo` command every minute leaving the response in a log file. The terminal where we run the project is also notified of the beginning and end of the chain.

## Details of the example project

### `package.json`

We find this dependencies:

```json
{
  "dependencies": {
    "@runnerty/executor-shell": "^3.1.0",
    "@runnerty/notifier-console": "^3.0.3",
    "@runnerty/trigger-schedule": "^3.0.3"
  }
}
```

- [`trigger-schedule`](https://github.com/runnerty/trigger-schedule/blob/master/README.md): Trigger for planned executions using expressions CRON [(more about triggers)](triggers.md).
- [`executor-shell`](https://github.com/runnerty/executor-shell/blob/master/README.md): Executor shell launches a command in a new process and we can pass that command any arguments [(more about executors)](executors.md).
- [`notifier-console`](https://github.com/runnerty/notifier-console/blob/master/README.md): Notifier used to monitor the events that the chain [(more about chains)](chain.md).

:::note
You can find more plugins available [here](plugins.md).
:::

### `config.json`

We find this:

```json
{
  "triggers": [
    {
      "id": "schedule_default",
      "type": "@runnerty-trigger-schedule"
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
      "id": "console_default",
      "type": "@runnerty-notifier-console"
    }
  ],
  "global_values": [
    {
      "WORKDIR": {
        "PATH": ".",
        "BATCH": "batch",
        "SQL": "sql"
      }
    },
    {
      "LOGS": {
        "PATH": "./logs"
      }
    }
  ],
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
```
:::note
In the examples shown here, a couple of functions (`@GV` and `@GETDATE`) from Runnerty's interpreter are used.
Learn more about the available functions [here.](functions.md)
:::

Let's focus on the three properties that include `triggers`, `executors`, and `notifiers`. Each plugin is assigned an identifier (id), type, which identifies the plugin and its configuration.

```json title="Example of a plugin with configuration"
{
  "executors": [
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

[Learn more about config](config.md).

### `plan.json`

```json title="We find this"
{
  "$schema": "https://raw.githubusercontent.com/runnerty/schemas/master/schemas/3.2/plan.json",
  "chains": [{ "chain_path": "./chains/chain-one.json" }]
}
```

```sh title="This is the hierarchy of a plan"
chains
├── chain
|   └── processes
|       ├── process
|       └── ...
├── chain
|   └── processes
|       ├── process
|       └── ...
└── ...
```

:::note
In the plan we can define the chain itself or instead, for a better organization, we can define the path (chain_path) to a json where to define the chain, as it is done in this guide.
:::

For this case, we have a single chain with a single process:

```sh
chains
└── CHAIN_ONE
    └── processes
        └── PROCESS_ONE
```

### `chain-one.json`

```json
{
  "$schema": "https://raw.githubusercontent.com/runnerty/schemas/master/schemas/3.2/chain.json",
  "id": "CHAIN_ONE",
  "name": "Chain one sample",
  "triggers": [
    {
      "id": "schedule_default",
      "schedule_interval": "*/1 * * * *"
    }
  ],
  "processes": [
    {
      "id": "PROCESS_ONE",
      "name": "Proccess One",
      "exec": {
        "id": "shell_default",
        "command": "echo hello world!"
      }
    }
  ]
}
```

[Learn more about chains](chain.md) and [about plans](plan.md).

