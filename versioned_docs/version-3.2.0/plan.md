---
id: plan
title: Plan
sidebar_label: Plan
---

The chain or chains that are going to be executed are defined in the plan.json file or in its defect we can indicate in the plan object of the configuration within the general section.


```json title="config.json"
{
  "general": {
    "...": "...",
    "plan": {
      "chains": [
        {
          "id": "MY_CHAIN_ONE",
          "...": "..."
        }
      ]
    }
  }
}
```

It is possible to load a chain from an external file using `chain_path`.

```json {3-5}
{
  "chains": [
    { "chain_path": "/var/runnerty/chains/my-chain-one.json" },
    { "chain_path": "/var/runnerty/chains/my-chain-two.json" },
    { "...": "..." }
  ]
}
```

Or directly as an object of the `chains` array:

```json {3-6}
{
  "chains": [
    {
      "id": "MY_CHAIN_ONE",
      "...": "..."
    }
  ]
}
```

Runnerty will try to get the `plan.json` file in the actual path but it is possible to indicate a `plan.json` file in the `config.json`:

```json
{
  "general": {
    "planFilePath": "/var/runnerty/my-plan.json"
  }
}
```

### Structure (chain and process)

A plan is formed by one or more chains. A chain is a set of processes with it’s own properties like scheduling, notifications, outputs, etc.

This is the basic structure of a plan with chain with one process:

```json {2,8}
{
  "chains": [
    {
      "id": "EXAMPLE_CHAIN",
      "name": "Name of the sample chain",
      "triggers": [],
      "depends_chains": [],
      "processes": [
        {
          "id": "PROCESS_ONE",
          "name": "Firts process of the chain",
          "exec": {
            "id": "shell default",
            "command": "echo 'Hello world'"
          }
        }
      ]
    }
  ]
}
```