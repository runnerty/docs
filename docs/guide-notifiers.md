---
id: guide-notifiers
title: 3. Monitoring with notifiers
---

This guide explains __how to plan and monitor__ the execution of a shell command.
This guide is the continuation of the previous section, if you have not yet completed it, [start here](/setup-create-project).
We will use two different runnerty notifiers, the [console notifier](https://github.com/runnerty/notifier-console) and the [email notifier](https://github.com/runnerty/notifier-mail). You can see the rest of available notifiers [here](/plugins#notifiers).
The `console notifier` will display the messages from:
	- Chain start
		- Start of process execution
		- End of process execution
		- Process execution error
	- End of chain
The `email notifier` will only be used for the:
	- Process execution error

In addition, a log file will be created that will record a summary at the end of the process.

## Let´s go

#### 1. The first step will be to add the email notifier to our project.
From the route of our project we execute:
```bash npm2yarn
npm i @runnerty/notifier-mail --save
```
To configure it edit `config.json` and include this in `notifiers`:

```json
{
  "id": "mail_error",
  "type": "@runnerty-notifier-mail",
  "from": "Runnerty <my@mail.com>",
  "to": ["NAME <to@mail.com>"],
  "transport": {
    "host": "smtp.mailhost.com",
    "port": 465,
    "secure": true,
    "auth": {
      "user": "USER_SAMPLE",
      "pass": "PASS_SAMPLE"
    }
  },
  "templateDir": "templates",
  "template": "mail-error",
  "attachments": [
    {
      "filename": "runnerty.png",
      "path": "templates/mail-error/runnerty.png",
      "cid": "cidrunnerty@runnerty.png"
    }
  ]
}
```

:::caution Important
The mail pluging requires a template for sending emails.
To start you can add a test template to your project from runnerty-cli:
```bash npm2yarn
npx runnerty-cli templates
```
:::


#### 2. Include the notifiers in the events of our process `PROCESS_ONE` in the `plan.json` file:

```json
"processes": [
    {
      "id": "PROCESS_ONE",
      //...
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
```

#### 3. Let's try

Run
```bash npm2yarn
npm start
```

In the next minute the string will be executed returning through the terminal the notifications that we have configured.

#### 4. __Force the error__ in the process to check that your notification mail is working correctly.

```json title="You can force the error by running an unknown command for the system"
"exec": {
  "id": "shell_default",
  "command": "unknown_cmd"
}
```
And run:
```bash npm2yarn
npm start
```

:::tip TIP
```bash npm2yarn title="You can force the execution of a chain without waiting for its trigger"
runnerty -c config.json -p plan.json -f CHAIN_ONE --end
```
:::