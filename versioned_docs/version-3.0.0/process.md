---
id: process
title: Processes
sidebar_label: Processes
---

In Runnerty, processes are calls to the executors. The executors are plugins which encapsulate functionalities. Know more about executors [here](executors.md).

There is a bunch of executors with different functionalities, have a look at the official [here](plugins.md).

One of the most important executors could be the shell executor [@runnerty/executor-shell](https://github.com/runnerty/executor-shell). As it is the Command-Line Interface, with this plugin is possible to execute existing processes that you may already have.

## Identification

Each process has two identification fields: `id` and `name`

`id` is the unique identification string of the process.
`name` is a description of the process

```json {4-5}
{
  "processes": [
    {
      "id": "PROCESS_ONE",
      "name": "First process of the chain"
    }
  ]
}
```

## Dependencies

With Runnerty is possible to establish dependencies betwwen processes. Runnerty provides a powerful feature for this task.

In the example below we can see how `PROCESS_ONE` has a dependcien with `PROCESS_TWO`. This way, `PROCESS_TWO` will only start when `PROCESS_ONE` had finished.

```json {6}
{
  "processes": [
    {
      "id": "PROCESS_TWO",
      "name": "Second process of the chain",
      "depends_process": ["PROCESS_ONE"]
      //...
    }
  ]
}
```

Not only it is possible to set up dependencies to other processes end states. You can also use operators to evaluate values, add complex conditions using operators and multiple expressions.

It is highly recommended to have a look at **dependencies** documentation [here](dependencies.md).

## Exec

In the exec property are the fields that identify the executor that is going to be used and the params needed.

```json {6-10}
{
  "processes": [
    {
      "id": "PROCESS_ONE",
      "name": "First process of the chain",
      "exec": {
        "id": "shell_default",
        "command": "echo 'Hello world'"
        //...
      }
    }
  ]
}
```

In this example we are using our shell_default executor, the configuration for this executor should be in our config.json file:

```json
{
  "executors": [
    {
      "id": "shell_default",
      "type": "@runnerty-executor-shell"
    }
  ]
}
```

With the `id` field we are indicating the executor that we are going tov use. The rest of the fields are params for the executor. Know more about the executors and their usage in [here](executors.md). You can also chekc the [config](config.md) documentation to know how to configure them.

## Retries

With runnerty we can configure a process to retry in case of error.
We only have to indicate the number of `retries` for the process and optionally the delay (`retry_delay`) between retries.

It is also possible to avoid the notifications `on_fail` of the failed executions previous to the last attempt.
We can indicate that only the last fail `notificate_only_last_fail` is notified.

Example:

```json {9-11}
{
  "processes": [
    {
      "id": "PROCESS_SAMPLE",
      "name": "Sample process with retries",
      "exec": {
        "id": "shell_default",
        "command": "node myprocess.js",
        "retries": 2,
        "retry_delay": "1s",
        "notificate_only_last_fail": true
        //...
      }
    }
  ]
}
```

In this example after the first execution failure, it will be retry up to 2 times with 1 second delays.
And the error will only be reported in case the last attempt fails.

We also have the possibility to implement specific notifications for retries in the `on_retry` event.

The number of retries for a process can be obtained from `PROCESS_RETRIES_COUNT` with the `@GETVALUES` function, to know more about values [here](values.md).

## Notifications

Runnerty also provides a notification system for your workflows. With the notifications property you can have access to the different states of the process: `on_start`, `on_fail`, `on_retry`, `on_end` and `on_queue` and use them to send notifications.

For this task, Runnerty uses **notifiers**, know more about them [here](notifiers.md).

This is an example of usage of notifications in a process. In this case, we are using the Telegram notifier to notify the different states of the process to a Telegram chat:

```json
{
  "id": "PROCESS_ONE",
  "name": "First process of the chain",
  "exec": {
    "id": "shell_default",
    "command": "echo 'Hello world'"
  },
  "notifications": {
    "on_start": [
      {
        "id": "telegram_default",
        "message": "THE PROCESS @GV(PROCESS_ID) HAS STARTED"
      }
    ],
    "on_fail": [
      {
        "id": "telegram_default",
        "message": "THE PROCESS @GV(PROCESS_ID) HAS FAILED"
      }
    ],
    "on_end": [
      {
        "id": "telegram_default",
        "message": "THE PROCESS @GV(PROCESS_ID) HAS FINISHED"
      }
    ],
    "on_queue": [
      {
        "id": "telegram_default",
        "message": "THE PROCESS @GV(PROCESS_ID) HAS QUEUE"
      }
    ],
    "on_timeout": [
      {
        "id": "telegram_default",
        "message": "THE PROCESS @GV(PROCESS_ID) HAS TIMEOUT"
      }
    ]
  }
}
```

:::note
In the example it is used the value `PROCESS_ID`, this value will have the id of the process. [Know more about](values).
:::

There is an official list of the available notifiers [here](plugins.md).

## Output

Another property of ther processes is that we can redirect the output of a process to a file.

```json {8-15}
{
  "id": "PROCESS_ONE",
  "name": "First process of the chain",
  "exec": {
    "id": "shell_default",
    "command": "echo 'Hello world'"
  },
  "output": [
    {
      "file_name": "/var/log/runnerty/general.log",
      "write": ["EXECUTION *@GV(PROCESS_ID)* @GETDATE(DD-MM-YY HH:mm:ss)"],
      "concat": true,
      "maxsize": "1mb"
    }
  ]
}
```

Runnerty provides some options to manage logs. Using the property `concat` we can indicate Runnerty if we want to concatente the output or overwrite it.

With the maxsize option we indicate Runnerty the maximun size that the log's file could have. Runnerty will automatically delete the firt lines of the file when it is full and needs to continue writting.

## Output Share (output_share)

The `output_share` property it is used to define values from the output of a process. Theses values area availables for the rest of the procesess of the chain.

For example:

```json {10-16}
{
  "processes": [
    {
      "id": "GET-USER-EMAIL",
      "name": "It get an user email",
      "exec": {
        "id": "mysql_default",
        "command": "SELECT email FROM USERS WHERE ID = 1"
      },
      "output_share": [
        {
          "key": "USER",
          "name": "EMAIL",
          "value": "@GV(PROCESS_EXEC_MSG_OUTPUT)"
        }
      ]
    }
  ]
}
```

In this example we are getting the email of an user from the database using the `@runnerty/executor_mysql` and assigning it to a value. This way we can use the `@GV(USER_EMAIL)` value anywhere of the chain.

Note that in this example we are are using the value `PROCESS_EXEC_MSG_OUTPUT`. This is a value that contains the return of the process. Have a look at the [values](values.md) documentation.

## Output Iterable (output_iterable)

The`output_iterable property it's used to iterate a chain depending of the output of a process. An iterable chain is a chain that is going to be executed for each object of the array returned by a process. For example, if we have a process which returns an objects array we can execute an iterable chain for each object of the array.

You can have a look at the [chains](chain.md) documentation to see an usage example.

## Output Filter (output_filter)

The **output_filter** property allows us to filter the results that the executor has returned in `PROCESS_EXEC_DATA_OUTPUT`. This can be useful if we want to work with only some of the records of the returned dataset, both for `ouput_iterable` (iterable chains) and for `output_share`.

For example for a given dataset with the following records:

```json
[
  {
    "TYPE": "A",
    "LEVEL": 1
  },
  {
    "TYPE": "A",
    "LEVEL": 2
  },
  {
    "TYPE": "B",
    "LEVEL": 1
  },
  {
    "TYPE": "B",
    "LEVEL": 3
  }
]
```

We could apply a filter that would return only those with `LEVEL` greater than `1` and `TYPE` equals `A`:

```json
{
  "processes": [
    {
      "id": "GET-DATA",
      //"...":"...",
      "output_filter": {
        "$and": [{ "LEVEL": { "$gt": 1 } }, { "TYPE": { "$eq": "A" } }]
      }
    }
  ]
}
```

The operation is similar to that of the [complex dependency evaluators](dependencies.md#evaluators) between processes.

The structure of the evaluator is `{"value 1": {"$condition": "value 2"}}`.
Of course in these values you can make use of all the functions.
These are the evaluators you can use:
```
$eq    - equal. Examples: {"VAL_1": {"$eq": "VAL_2"}}, {"@GV(VAR1)": {"$eq": "@GV(VAR2)"}}
$ne    - not equal. Example: {"@UPPER(str_sample)": {"$ne": "@GV(VAR2)"}}
$match - supports regular expressions. Example: {"aBc":{"$match":"/ABC/i"}}
$gt    - greater than. Example: {"@LENGTH(str_sample)": {"$gt": "@GV(VAR_INT_1)"}}
$gte   - greater than equal. Example: {2:{"$gte":1}
$lt    - less than
$lte   - less than equal
$in    - determine if a specified value matches any value in a list. Example: {"VAL_1": {"$in": ["A","B"]}}
$nin   - determine if a specified value does not match any value in a list. Example: {"VAL_1": {"$in": ["A","B"]}}
```

## Output Order (output_order)

The **output_order** property allows us to ordert the results that the executor has returned in `PROCESS_EXEC_DATA_OUTPUT`. This can be useful if we want to work on an ordered dataset both for `ouput_iterable` (iterable chains) and for `output_share`.

For example for a given dataset with the following records:

```json
[
  {
    "TYPE": "A",
    "LEVEL": 1
  },
  {
    "TYPE": "A",
    "LEVEL": 2
  },
  {
    "TYPE": "B",
    "LEVEL": 1
  },
  {
    "TYPE": "B",
    "LEVEL": 3
  }
]
```
We could apply its ordering like in this example:
```json
{
  "processes": [
    {
      "id": "GET-DATA",
      //"...":"...",
      "output_order": ["TYPE", "LEVEL desc"]
    }
  ]
}
```
This would order the output like this:
```json
[
  {
    "TYPE": "A",
    "LEVEL": 2
  },
  {
    "TYPE": "A",
    "LEVEL": 2
  }, 
  {
    "TYPE": "B",
    "LEVEL": 3
  },
  {
    "TYPE": "B",
    "LEVEL": 1
  }
]
```

## TimeOut (timeout)

The timeout property it's used to set the maximun time to wait process ends.

It is possible to establish two different actions, end or error. If the `error` action is indicated, the process will end with a failure and if `end` is indicated the process will end without failure. In both cases the function `kill` of the executor in question will be called.

In addition to the action must indicate the mandatory property `delay` indicating the maximum timeout in milliseconds.

For example:

```json {5-8}
{
  "processes": [
    {
      //...
      "timeout": {
        "action": "error",
        "delay": "3s"
      }
    }
  ]
}
```

Delay property understands the following strings:

- `x milliseconds`
- `x millisecond`
- `x msecs`
- `x msec`
- `x ms`
- `x seconds`
- `x second`
- `x secs`
- `x sec`
- `x s`
- `x minutes`
- `x minute`
- `x mins`
- `x min`
- `x m`
- `x hours`
- `x hour`
- `x hrs`
- `x hr`
- `x h`
- `x days`
- `x day`
- `x d`
- `x weeks`
- `x week`
- `x wks`
- `x wk`
- `x w`
- `x years`
- `x year`
- `x yrs`
- `x yr`
- `x y`

The space after the number is optional so you can also write `1ms` instead of `1 ms`. In addition to that it also accepts numbers and strings which only includes numbers and we assume that these are always in milliseconds.

From: [Millisecond module](https://github.com/unshiftio/millisecond)
