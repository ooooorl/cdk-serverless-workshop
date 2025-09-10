<!-- # 🚀 Workshop Challenge: AWS CDK + GitHub Actions

Welcome to the **DevOps Workshop Challenge**! 🎉
Your mission is to build and deploy a **ToDo application** using **React (frontend)** and a **serverless backend** (API Gateway + Lambda + DynamoDB), all provisioned with **AWS CDK** and deployed automatically with **GitHub Actions CI/CD pipelines**.

This challenge will introduce you to **Infrastructure as Code (IaC)**, **serverless architecture**, and **DevOps pipelines** — the key pillars of modern cloud-native development.

---

## 📋 Workshop Milestones

### **Milestone 1: Provision Frontend Infrastructure (S3 + CloudFront)**

- Create an **S3 bucket** for hosting the React frontend.
- Configure a **CloudFront distribution** to serve the React app globally.
- Deploy the initial React build (`npm run build`) to S3.

---

### **Milestone 2: Provision Backend Infrastructure (API Gateway + Lambda + DynamoDB)**

- Create a **DynamoDB table** for storing ToDo items.
- Define a **Lambda function** (TypeScript) to handle CRUD operations.
- Expose the Lambda through an **API Gateway** HTTP API.
- 🔍 _Challenge_: Implement these operations: `addTodo`, `deleteTodo`, `getTodo`, `getTodos`, `updateTodo`.

---

### **Milestone 3: CI/CD Pipelines (GitHub Actions)**

- Create a GitHub Actions workflow:

  1. Frontend CI Pipeline to run checks (lints, tests, build).
  2. Frontend CD Pipeline to deploy frontend application to Staging environment (S3 and CloudFront).
  3. Infra CI Pipeline to validate infrastructure.
  4. Infra CD Pipeline to deploy infrastructure to Staging environment.

---

### **Milestone 4: Create a New Production Environment**

- Add a **new CDK environment** (e.g., `prod`) alongside the default `staging`.
- Deploy your app into this new environment.
- Configure your pipeline to allow **manual approval** before deploying to `prod`.

---

## 🛠️ Prerequisites

Before starting, make sure you have:

- An **AWS account** with permissions for S3, CloudFront, DynamoDB, Lambda, and API Gateway.
- Installed on your laptop:

  - [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
  - [Node.js](https://nodejs.org/en/download/) (v16+)
  - [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html) (`npm install -g aws-cdk`)

- A **GitHub account** with repository access.

---

## 📂 Project Structure

```
/frontend         # React app (ToDo frontend)
/backend          # Lambda functions (CRUD handlers in TypeScript)
/infra            # AWS CDK stacks
/.github/workflows # GitHub Actions workflows
```

---

## 🏁 Success Criteria

By the end of this challenge, you should have:

- A working **React ToDo app** hosted on S3 + CloudFront.
- A **serverless backend** running with API Gateway + Lambda + DynamoDB.
- An automated **CI/CD pipeline** deploying your app via GitHub Actions.
- Two environments: `staging` and `prod`.

---

## ✅ Tips for Success

- Work in groups of 3–4 for collaboration.
- Don’t hesitate to check AWS CDK docs or AWS Console for hints.
- If you get stuck, use the provided hints or ask a facilitator.

---

⚡ At the end, we’ll have a **showcase session** — where each group will demo their deployed ToDo app running live on AWS! -->
