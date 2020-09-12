---
id: setup
title: Setting Up
---

This tutorial is intended for new users who want detailed instructions on how to build a basic Runnerty project. Let's start!

## Pre-requisites

### Git

Git is a version control system for tracking changes in source code during software development and it can help you synchronize and version files between your local system and your online repository. Git for Windows includes Git Bash, a terminal application. If not already installed, see [Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

### Node.js
Node.js is an environment that can run JavaScript code outside of a web browser and is used to write and run server-side JavaScript apps. Node.js installation includes `npm`, the package manager that allows you to install NPM modules from your terminal.

1. Open Terminal on a Mac, Linux, or Unix system. Open Git Bash on a Windows system.
1. If you have `brew` on your OS, run the following command to install Node.

```sh
brew install node
```

Alternatively, you can download an installer from the [Node.js homepage](https://nodejs.org/en/).

#### Check your Node.js installation

Check that you have the minimum required version installed by running the following command:

```sh
node -v
```

You should see a version larger than Node 12.

```sh
node -v
v12.18.3
```

> Runnerty v2 minimum supported Node.js version is Node 12, but more recent versions will work as well.

### Runnerty (optional)
For this setup it is not necessary to install runnerty (it has been included as a dependency to simplify the process) but it is recommended to install it when you want to advance a little more.

1. Open Terminal and simply runs this command:

```sh
npm install -g runnerty
```

You should see a version.

```sh
runnerty -v
Runnerty 2.*.*
```
[Here you have more information about the use of runnerty in the terminal](usage.md)