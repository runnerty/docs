---
id: share-process-data
title: 6. Share process data
---

This guide explains ** how to share data between processes**.
In many occasions we will need to communicate data from one process to another, when a process is in charge of generating or obtaining data that are required for the execution of the next process.
In Runnerty we can indicate the data we need to share through the `OUTPUT_SHARE` property of the process that shares the data.

### Output Share

This property is an array of objects in which we must indicate for each one of the objects, `key` (prefix of the value to create), `name` (name) and `value` (assigned value).
Runnerty will create the new variable concatenating `key` and `name` using `_` as separator.

```json {10-21,27}
{
  "processes": [
    {
      "id": "GET-USER-EMAIL",
      "name": "It get an user email",
      "exec": {
        "id": "mysql_default",
        "command": "SELECT email, name FROM USERS WHERE ID = 1"
      },
      "output_share": [
        {
          "key": "USER",
          "name": "EMAIL",
          "value": "@GV(PROCESS_EXEC_DB_FIRSTROW_EMAIL)"
        },
        {
          "key": "USER",
          "name": "NAME",
          "value": "@GV(PROCESS_EXEC_DB_FIRSTROW_NAME)"
        }
      ]
    },
    {
      "id": "mail_default",
      "to": ["@GV(USER_EMAIL)"],
      "title": "Welcome to Runnerty!",
      "message": "Hi @GV(USER_NAME)! My message from Runnerty!"
    }
  ]
}
```
In this example we see how the `USER_EMAIL` and `USER_NAME` variables are created, which we can access in the following process by means of the `GETVALUE` function.

:::important
It is important to read the documentation of `output` of each executor to know the fields and values that they offer us since they are not always offered only `PROCESS_EXEC_MSG_OUTPUT`, `PROCESS_EXEC_DATA_OUTPUT` and `PROCESS_EXEC_ERR_OUTPUT` in case of error.
:::

### Let's see how to apply it to our example:

```json {12-19,28}
{
  "chains": [
    {
      "id": "CHAIN_ONE",
      //...,
      "processes": [
        {
          "id": "PROCESS_ONE",
          "name": "Proccess One",
          "exec": {
            "id": "shell_default",
            "command": "echo RUNNERTY",
            "output_share": [
              {
                "key": "MY",
                "name": "NAME",
                "value": "@GV(PROCESS_EXEC_MSG_OUTPUT)"
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
            "command": "echo Hello from @GV(MY_NAME)"
          }
        }
      ]
    }
  ]
}
```
