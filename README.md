# Service Order System

This project is a simplified system to manage **Customers, Motorcycles, and Service Orders**.

### System Rules:
- A **Customer** can have **N** motorcycles.
- A **Motorcycle** belongs to **only one** owner but can have **N** service orders.
- Each **Service Order** is linked to **one** motorcycle.

---

## Technologies Used

### Backend
- **Java** + **Spring Boot**
- **Maven** for dependency management
- **Swagger** for API documentation
- **MySQL** as the database

### Frontend
- **React** + **TypeScript**
- **Vite** for optimized build
- **TailwindCSS** for styling

## Project Structure

### Backend (API)
```plaintext
src/
└── main/
    └── java/com/so/system/
        ├── config/
        ├── controller/
        ├── dtos/
        ├── model/
        ├── repository/
        └── service/
```

The backend provides REST endpoints to manage customers, motorcycles, and service orders.

### Frontend
The frontend is a React application that makes HTTP requests to the API, allowing interaction with the data.

### Class Diagram
```mermaid
classDiagram
    class CustomerService {
      - repository: CustomerRepository
      + getCustomerById(id: Integer): Customer
      + addCustomer(customer: Customer): void
      + disableCustomer(id: Integer): void
      + showCustomerInfo(id: Integer): CustomerDTO
      + showAll(): List<CustomerDTO>
    }

    class MotorcycleService {
      - motorcycleRepository: MotorcycleRepository
      - customerRepository: CustomerRepository
      - customerService: CustomerService
      + getMotorById(id: Integer): Motorcycle
      + addMotorcycle(id: Integer, motorcycle: Motorcycle): void
      + showMotorcycleInfo(id: Integer): MotorcycleDTO
      + disableMotorcycle(id: Integer): void
      + showAllOs(id: Integer): List<ServiceOrderDTO>
    }

    class ServiceOrderService {
      - soRepository: ServiceOrderRepository
      - motorRepository: MotorcycleRepository
      - motorService: MotorcycleService
      + getOSById(id: Integer): ServiceOrder
      + createSO(id: Integer, serviceOrder: ServiceOrder): void
      + showOs(id: Integer): ServiceOrderFullDTO
    }

    CustomerService --> CustomerRepository
    MotorcycleService --> MotorcycleRepository
    MotorcycleService --> CustomerRepository
    MotorcycleService --> CustomerService
    ServiceOrderService --> ServiceOrderRepository
    ServiceOrderService --> MotorcycleRepository
    ServiceOrderService --> MotorcycleService
```

### System Diagram
```mermaid
graph TD;
    Frontend -->|HTTP Requests| API;
    API -->|Accesses| Database;
    Database -->|Returns Data| API;
    API -->|Responds| Frontend;
```
