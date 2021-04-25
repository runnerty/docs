---
id: guide-notifiers
title: 3. Monitoring with notifiers
---

This guide explains **how to plan and monitor** the execution of a shell command.
This guide is the continuation of the previous section, if you have not yet completed it, [start here](/setup-create-project).
We will use two different runnerty notifiers, the [console notifier](https://github.com/runnerty/notifier-console) and the [email notifier](https://github.com/runnerty/notifier-mail). You can see the rest of available notifiers [here](/plugins#notifiers).
The `console notifier` will display the messages from: - Chain start - Start of process execution - End of process execution - Process execution error - End of chain
The `email notifier` will only be used for the: - Process execution error

In addition, a log file will be created that will record a summary at the end of the process.

## Let´s go

#### 1. The first step will be to add the email notifier to our project.

From the route of our project we execute:

```bash npm2yarn
runnerty add @runnerty/notifier-mail
```

When we install a module with the Runnerty [add command](CLI.md#add-options), one or more example configurations will be created in our `config.json` file as well as a plan with an example of use of the installed module.

In this case three different configuration examples will be included in `config.json`. Keep the settings that suit you best and modify the data with those of your account:

```json
{
  "notifiers": [
    {
      "id": "mail_smtp",
      "type": "@runnerty-executor-mail"
      // ...
    },
    {
      "id": "mail_aws_ses",
      "type": "@runnerty-executor-mail"
      // ...
    },
    {
      "id": "mail_sparkpost",
      "type": "@runnerty-executor-mail"
      // ...
    }
  ]
}
```

#### 2. We include the notification in the fail event of our process `PROCESS_ONE` in the file` chain-one.json`:

```json
{
  "processes": [
    {
      "id": "PROCESS_ONE",
      //...
      "notifications": {
        "on_fail": [
          {
            "id": "mail_error",
            "subject": "Error @GV(PROCESS_ID) of the chain @GV(CHAIN_ID)",
            "message": "Cmd. executed:<br> @GV(PROCESS_EXEC_COMMAND_EXECUTED) <br>Error:<br> @GV(PROCESS_EXEC_ERR_OUTPUT)"
          }
        ]
      }
    }
  ]
}
```

#### 3. Let's try

Run

```bash npm2yarn
runnerty
```

In the next minute the string will be executed returning through the terminal the notifications that we have configured.

#### 4. **Force the error** in the process to check that your notification mail is working correctly.

```json title="You can force the error by running an unknown command for the system"
"exec": {
  "id": "shell_default",
  "command": "unknown_cmd"
}
```

And run:

```bash npm2yarn
runnerty
```


```bash npm2yarn title="You can force the execution of a chain without waiting for its trigger"
runnerty -f CHAIN_ONE --end
```
