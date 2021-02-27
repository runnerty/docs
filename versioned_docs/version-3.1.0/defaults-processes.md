---
id: defaults-processes
title: 5. Defaults processes
---

In many occasions we repeat the same `output` or `notifications` configurations of our processes and it is ideal to be able to keep them in one place.
For this we can use the property `defaults_processes` of the chain.

### Let's apply it to our example

```json {6}
{
  "$schema": "https://raw.githubusercontent.com/runnerty/schemas/master/schemas/3.1/plan.json",
  "chains": [
    {
      "id": "CHAIN_ONE",
      "defaults_processes": {
        "notifications": {
          "on_start": [
            {
              "id": "console_default",
              "message": "@GETDATE('YYYY-MM-DD HH:mm:ss') START OF THE CHAIN: @GV(CHAIN_ID)"
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
              "message": "@GETDATE('YYYY-MM-DD HH:mm:ss') END OF THE CHAIN: @GV(CHAIN_ID)"
            }
          ]
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
        ]
      },
      //...
      "processes": [
        {
          "id": "PROCESS_ONE",
          //...
        },
        {
          "id": "PROCESS_TWO",
          "depends_process": { "$end": "PROCESS_ONE" },
          //...
        }
      ]
    }
  ]
}
```

:::note
We can overwrite any property or event defined in `defaults_processes` indicating them in the corresponding process.
:::


### Summary

At this point our plan should be similar to this:

```json
{
  "$schema": "https://raw.githubusercontent.com/runnerty/schemas/master/schemas/3.1/plan.json",
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
      "defaults_processes": {
        "notifications": {
          "on_start": [
            {
              "id": "console_default",
              "message": "@GETDATE('YYYY-MM-DD HH:mm:ss') START OF THE CHAIN: @GV(CHAIN_ID)"
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
              "message": "@GETDATE('YYYY-MM-DD HH:mm:ss') END OF THE CHAIN: @GV(CHAIN_ID)"
            }
          ]
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
        ]
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
      },
      "processes": [
        {
          "id": "PROCESS_ONE",
          "name": "Proccess One",
          "exec": {
            "id": "shell_default",
            "command": "echo Runnerty: hello world!"
          }
        },
        {
          "id": "PROCESS_TWO",
          "name": "Proccess TWO",
          "depends_process": { "$end": "PROCESS_ONE" },
          "exec": {
            "id": "shell_default",
            "command": "echo Hello from PROCESS_TWO"
          }
        }
      ]
    }
  ]
}
```

