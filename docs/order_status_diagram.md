# Order State Diagram

```mermaid
graph TD
    A[UNASIGNED] --> B[TAKEN]
```

1. order initialized as `UNASIGNED` status
2. once order has been taken, it will change to `TAKEN` status
