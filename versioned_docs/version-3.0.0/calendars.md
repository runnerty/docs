---
id: calendars
title: Calendars
sidebar_label: Calendars
---

In runnerty we can make use of calendar events (ics) to allow or disallow the execution of [triggers](triggers.md).

### Configuration

In the `config.json` file of the project we will add the path with a directory that contains calendars (`calendarsFolder`) or a list of calendars (`calendars`) in which we will indicate their name and _path_ or _url_.

```json
{
  "general": {
    "calendars": {
      "holidays": "./my-calendars/holidays_2021.ics",
      "not-working": "http://docs.runnerty.io/not-working-days.ics",
      "special-dates": "./my-calendars/special-dates.ics"
    },
    "calendarsFolder": "./calendars/"
    //...
  }
}
```

In the case of `calendarsFolder`, the name that will be assigned to the calendar will be the basename of the ics.

```sh title="If our calendars folder contains these files"
./calendars/
 ├── maintenances.ics
 └── backups-windows.ics
```

The names assigned to each of the calendars will be _maintenances_ and _backups-windows_.

### Usage

In the configuration of any trigger we can include the `calendars` property in which we will indicate in the` allow` attribute the calendar based on which the trigger can be executed and / or in `disallow` the calendar based on which the trigger cannot run.

```json
{
  "id": "CHAIN_ONE",
  //...
  "triggers": [
    {
      "id": "schedule_default",
      "schedule_interval": "*/1 * * * *",
      "calendars": {
        "allow": "special-dates",
        "disallow": "backups-windows"
      }
    }
  ]
  //...
}
```
