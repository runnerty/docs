---
id: guide-dependencies
title: 3. Process dependencies
---

This guide explains __how to create dependencies between processes__.
This guide is the continuation of the previous section, if you have not yet completed it, [start here](/setup-create-project).


### Simple dependency

We will start with something very simple, we will create a second process `PROCESS_TWO` that will be executed only if the first process `PROCESS_ONE` finishes without errors.

We will do this by including the `depends_process` property in the process `PROCESS_TWO`:

```json {9}
"processes": [
    {
      "id": "PROCESS_ONE",
      //...
    },
    {
      "id": "PROCESS_TWO",
      "name": "Proccess TWO",
      "depends_process": { "$end": "PROCESS_ONE" },
      "exec": {
        "id": "shell_default",
        "command": "echo Hello from PROCESS_TWO"
      }
      //...
    },
]
```
:::tip
We can also concatenate checks of the states of the processes and any other available variable.
Learn more about dependencies [here.](dependencies.md)
:::

### Summary

At this point our plan should be similar to this:

```json
{
  "$schema": "https://raw.githubusercontent.com/runnerty/schemas/master/schemas/2.8/plan.json",
  "chains": [
    {
      "id": "CHAIN_ONE",
      "name": "Chain one sample",
      "triggers": [
        {
          "id": "schedule_default",
          "schedule_interval": "*/1 * * * *"
        }
      ],
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
        ]
      },
      "processes": [
        {
          "id": "PROCESS_ONE",
          "name": "Proccess One",
          "exec": {
            "id": "shell_default",
            "command": "echo Runnerty: hello world!"
          },
          "output": [
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
            "on_start": [
              {
                "id": "console_default",
                "message": "START PROCESS @GV(PROCESS_ID)"
              }
            ],
            "on_fail": [
              {
                "id": "console_default",
                "message": "Error: @GV(PROCESS_ID) \n Error: @GV(PROCESS_EXEC_ERR_OUTPUT)",
                "mode": "error"
              },
              {
                "id": "mail_error",
                "subject": "Error @GV(PROCESS_ID) of the chain @GV(CHAIN_ID)",
                "message": "Cmd. executed:<br> @GV(PROCESS_EXEC_COMMAND_EXECUTED) <br>Error:<br> @GV(PROCESS_EXEC_ERR_OUTPUT)"
              }
            ],
            "on_end": [
              {
                "id": "console_default",
                "message": "END PROCESS @GV(PROCESS_ID). OUTPUT: @GV(PROCESS_EXEC_MSG_OUTPUT)"
              }
            ]
          }
        },
        {
          "id": "PROCESS_TWO",
          "name": "Proccess TWO",
          "depends_process": { "$end": "PROCESS_ONE" },
          "exec": {
            "id": "shell_default",
            "command": "echo Hello from PROCESS_TWO"
          },
          "notifications": {
            "on_start": [
              {
                "id": "console_default",
                "message": "START PROCESS @GV(PROCESS_ID)"
              }
            ],
            "on_fail": [
              {
                "id": "console_default",
                "message": "Error: @GV(PROCESS_ID) \n Error: @GV(PROCESS_EXEC_ERR_OUTPUT)",
                "mode": "error"
              },
              {
                "id": "mail_error",
                "subject": "Error @GV(PROCESS_ID) of the chain @GV(CHAIN_ID)",
                "message": "Cmd. executed:<br> @GV(PROCESS_EXEC_COMMAND_EXECUTED) <br>Error:<br> @GV(PROCESS_EXEC_ERR_OUTPUT)"
              }
            ],
            "on_end": [
              {
                "id": "console_default",
                "message": "END PROCESS @GV(PROCESS_ID). OUTPUT: @GV(PROCESS_EXEC_MSG_OUTPUT)"
              }
            ]
          }
        }
      ]
    }
  ]
}
```