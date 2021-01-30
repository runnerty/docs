---
id: setup-create-project
title: 1. Create a project
---

We will use [runnerty-cli](https://github.com/runnerty/runnerty-cli) to create our first project.

1. Let's create the project, execute this command in your terminal.

```bash npm2yarn
npx runnerty-cli new my-first-runnerty-project
```

:::note
if desired, we can also install `runnerty-cli`

```bash npm2yarn
npm i -g runnerty-cli
```

:::

The following contents will be created in your current directory.

```sh
└── my-first-runnerty-project/
    ├── config.json
    ├── plan.json
    └── package.json
```

2. Run `npm start`.

🎉🎉 Congratulations, you have just made your first Runnerty project!

You can know connect to [Runnerty Platform](connect-to-platform).

This workflow executes an `echo` command every minute leaving the response in a log file. The terminal where we run the project is also notified of the beginning and end of the chain.

## Details of the example project

### `package.json`

We find this dependencies:

```json
{
  "dependencies": {
    "@runnerty/executor-shell": "^3.0.0",
    "@runnerty/notifier-console": "^3.0.0",
    "@runnerty/trigger-schedule": "^3.0.0"
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
  ]
}
```

Three sections to include triggers, executors, and notifiers. Each plugin is assigned an identifier (id), type, which identifies the plugin and its configuration.

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
  "$schema": "https://raw.githubusercontent.com/runnerty/schemas/master/schemas/3.0/plan.json",
  "chains": [
    {
      "id": "CHAIN_ONE", // Chain ID
      "name": "Chain one sample", // Chain descriptor name
      "triggers": [
        {
          "id": "schedule_default", // It´s use the schedule plugin that we previously configured
          "schedule_interval": "*/1 * * * *" // It´s use CRON expression "At every minute"
        }
      ],
      "notifications": {
        // Notifications of this chain
        "on_start": [
          // Start event
          {
            "id": "console_default", // It´s use the console plugin that we previously configured
            "message": "@GETDATE('YYYY-MM-DD HH:mm:ss') START OF THE CHAIN: @GV(CHAIN_ID)" // It´s use the co
          }
        ],
        "on_end": [
          // End event
          {
            "id": "console_default",
            "message": "@GETDATE('YYYY-MM-DD HH:mm:ss') END OF THE CHAIN: @GV(CHAIN_ID)"
          }
        ]
      },
      "processes": [
        {
          "id": "PROCESS_ONE", // Process ID
          "name": "Proccess One", // Process descriptor name
          "exec": {
            "id": "shell_default", // It´s use the executor plugin that we previously configured
            "command": "echo Runnerty: hello world!"
          },
          "output": [
            // Output configuration to files of process
            {
              "file_name": "./@GETVALUE(PROCESS_ID).log",
              "write": [
                "EXECUTION @GV(PROCESS_ID) - AT @GETDATE('YYYY-MM-DD HH:mm:ss')\n @GV(PROCESS_EXEC_ERR_OUTPUT) @GV(PROCESS_EXEC_MSG_OUTPUT)"
              ],
              "concat": true,
              "maxsize": "10mb"
            }
          ],
          "notifications": {
            // We could set up process notifications
            "on_start": [],
            "on_fail": [],
            "on_retry": [],
            "on_end": []
          }
        }
      ]
    }
  ]
}
```

```sh title="This is the hierarchy of a plan"
chains
├── chain
    └── processes
        ├── process
        └── ...
├── chain
    └── processes
        ├── process
        └── ...
└── ...
```

For this case, we have a single chain with a single process:

```sh
chains
└── CHAIN_ONE
    └── processes
        └── PROCESS_ONE
```

:::note
It is likely that if you do a real project with Runnerty you will need to split the plan into several documents. This is possible by making a document for each chain and indicating in `chains`/`chain_path` the document path of the chain.

```json
{
  "chains": [
    { "chain_path": "chains/chain_sample.json" },
    //...
  ]
}
```

:::

[Learn more about chains](chain.md) and [about plans](plan.md).

:::note
In the examples shown here, a couple of functions (`@GV` and `@GETDATE`) from Runnerty's interpreter are used.
Learn more about the available functions [here.](functions.md)
:::
