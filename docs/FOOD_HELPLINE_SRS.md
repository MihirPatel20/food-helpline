# Food Helpline

**Guide:** Prof. Amit Solanki\
**Team Members:**

- Mr. Vishal Patel (23172012020)
- Mr. Nayka Shreyash (23172012010)
- Mr. Divy Patel (23172022014)

## **1. Introduction**

### **1.1 Purpose**

The Food Helpline system aims to reduce food waste and address food insecurity by creating an efficient platform connecting restaurants with surplus food to NGOs and food banks.

### **1.2 Project Scope**

- Digital platform for food donation management
- Real-time coordination between restaurants, NGOs, and delivery agents
- Food waste reduction tracking and impact measurement
- Secure and efficient food redistribution system

## **2. System Requirements**

### **2.1 User Types**

1. **Restaurants (Donors)**

   - Profile management
   - Food donation creation and tracking
   - Donation history access
   - Real-time status updates

2. **NGOs (Recipients)**

   - Profile and capacity management
   - Donation request and acceptance
   - Delivery scheduling
   - Food receipt confirmation

3. **Delivery Agents**

   - Profile and availability management
   - Pickup/delivery assignment acceptance
   - Route information access
   - Delivery status updates

4. **System Administrators**
   - User verification and management
   - System monitoring
   - Issue resolution
   - Report generation

### **2.2 Functional Requirements**

#### **2.2.1 Food Donation Management**

1. **Donation Creation**

   - Multiple food items per donation
   - Detailed food categorization (cooked, packaged, produce, dairy, grains)
   - Quantity with standardized units (kg, items, servings, liters)
   - Nutritional information tracking
   - Allergen information
   - Preparation and expiry time tracking
   - Special handling instructions
   - Packaging details

2. **Donation Matching**

   - Location-based NGO matching using geospatial queries
   - NGO capacity verification
   - Service area compatibility
   - Time window compatibility
   - Food type suitability
   - Multiple food items handling

3. **Status Tracking**
   - Enhanced status workflow (pending → matched → assigned → picked_up → delivered)
   - Digital proof of delivery (signatures and photos)
   - Dispute resolution system
   - Rating system for all participants

#### **2.2.2 User Management**

1. **Registration & Authentication**

   - Role-based user types (restaurant, NGO, delivery agent, admin)
   - Enhanced verification process
   - Multi-language support (English, Hindi, Gujarati)
   - Status management (pending, active, suspended)

2. **Profile Management**
   - Business details for restaurants
   - Registration numbers for NGOs
   - Vehicle information for delivery agents
   - Operating hours
   - Service area management
   - Capacity specifications

### **2.3 Non-Functional Requirements**

#### **2.3.1 Performance**

- Geospatial queries optimization
- Efficient multi-item donation handling
- Real-time status updates
- Optimized database indexing

#### **2.3.2 Security**

- Secure user authentication
- Data encryption
- Privacy protection
- Regular security audits

#### **2.3.3 Reliability**

- System uptime: 99.9%
- Data backup: Daily
- Error recovery mechanisms
- Fault tolerance

#### **2.3.4 Usability**

- Intuitive interface
- Mobile responsiveness
- Minimal training required
- Multi-language support (English, Hindi, Gujarati)

## **3. System Features**

1. **User Registration & Authentication**

   - Role-based registration
   - Email verification
   - Profile completion

2. **Donation Management**

   - Create donations
   - Track status
   - Update/cancel donations
   - View history

3. **Assignment System**
   - Automatic NGO matching
   - Delivery agent assignment
   - Route optimization
   - Status updates

## **4. System Constraints**

### **4.1 Technical Constraints**

- Internet connectivity required
- Mobile device compatibility
- Browser compatibility
- Storage limitations

### **4.2 Business Constraints**

- Food safety regulations
- Transportation regulations
- Time-sensitive operations
- Geographic limitations

## **5. Success Metrics**

- Number of successful donations
- Amount of food saved
- Number of active users
- Average matching time
- Delivery success rate
- User satisfaction ratings

## **6. Future Enhancements**

- Integration with food safety monitoring systems
- Advanced analytics dashboard
- Mobile application development
- Community engagement features
- Gamification elements

## **7. Conclusion**

The Food Helpline system provides a crucial platform for efficient food redistribution, helping reduce waste while addressing food insecurity in the community.

&nbsp;

## **UML Diagrams**

#### **Use Case Diagram**

```plantuml
@startuml
left to right direction
skinparam actorStyle awesome

actor "Restaurant" as REST
actor "NGO" as NGO
actor "Delivery Agent" as DA
actor "System Admin" as ADMIN

rectangle "Food Helpline System" {
    package "Donation Management" {
        usecase "Create Food Donation" as UC5
        usecase "View Available Donations" as UC6
        usecase "Accept Donation" as UC7
        usecase "Track Donation Status" as UC8
        usecase "Update Donation Details" as UC9
        usecase "Set Food Expiry" as UC22
        usecase "Add Special Instructions" as UC23
    }

    package "Delivery Management" {
        usecase "Assign Delivery Agent" as UC10
        usecase "Update Delivery Status" as UC11
        usecase "View Delivery Route" as UC12
        usecase "Confirm Delivery" as UC13
        usecase "Rate Experience" as UC24
    }

    package "Admin Functions" {
        usecase "Verify Users" as UC14
        usecase "Monitor System" as UC15
        usecase "Generate Reports" as UC16
        usecase "Manage Food Categories" as UC17
        usecase "Handle Disputes" as UC25
    }
}

' Actor Relationships
REST --> UC5
REST --> UC8
REST --> UC9
REST --> UC22
REST --> UC23

UC6 --> NGO
UC13 --> NGO
UC7 --> NGO
UC24 --> NGO
UC10 --> NGO

DA --> UC11
DA --> UC12
DA --> UC24
DA --> UC13

ADMIN --> UC14
ADMIN --> UC15
ADMIN --> UC16
ADMIN --> UC17
ADMIN --> UC25

@enduml
```

#### **Sequence Diagram**

```plantuml
@startuml
actor "Restaurant" as Donor
participant "System Admin" as Admin
actor "Delivery Agent" as Agent

Donor -> Admin : 1: Login/Register()
Admin --> Donor : 2: Authentication Success()

Donor -> Admin : 3: Submit Donation Details()
Admin --> Donor : 4: Confirm Donation()
Donor -> Admin : 5: Update Food Details()

Agent -> Admin : 6: Login()
Admin --> Agent : 7: Authentication Success()

Agent -> Admin : 8: View Available Donations()
Admin --> Agent : 9: Display Pickup List()

Agent -> Admin : 10: Update Delivery Status()
@enduml

```

#### **Activity Diagram**

```plantuml
@startuml
start

:Restaurant Login;

if (Valid Credentials?) then (Yes)
    :Create Food Donation;
    :Enter Food Details;
    :Set Expiration Time;

    fork
        :System Matches with NGOs;
        if (NGO Available?) then (Yes)
            :Notify NGO;
            if (NGO Accepts?) then (Yes)
                :Assign Delivery Agent;
                :Agent Picks Up Food;
                :Deliver to NGO;
                :Confirm Delivery;
            else (No)
                :Find Alternative NGO;
            endif
        else (No)
            :Store in Pending List;
        endif
    fork again
        :Update Donation Status;
    end fork
else (No)
    :Show Error Message;
    :Return to Login;
endif

stop
@enduml

```

#### **Class Diagram**

```plantuml
@startuml

class Restaurant {
    +name: String
    +password: String
    +contactNumber: String
    +emailID: String
    --
    +register()
    +login()
    +manageFoodDonation()
    +viewDonationStatus()
    +logout()
}

class DeliveryAgent {
    +name: String
    +password: String
    +contactNumber: String
    +emailID: String
    --
    +register()
    +login()
    +receiveNotifications()
    +submitReport()
    +logout()
}

class SystemAdmin {
    +agentList: List<DeliveryAgent>
    +donorList: List<Restaurant>
    +adminID: String
    +agentDetails: Map
    +donorDetails: Map
    --
    +manageAgents()
    +manageDonors()
    +manageFoodInventory()
    +updateSystemSettings()
}

Restaurant --> SystemAdmin : Submits Food Details
DeliveryAgent --> SystemAdmin : Views Donation Details

@enduml

```

#### **Entity-Relationship (ER) Diagram**

```plantuml
@startuml
entity User {
  * userID : int [PK]
  --
  name : String
  email : String [Unique]
  password : String
  role : Enum {Restaurant, Recipient, Volunteer, Admin}
}

entity Restaurant {
  * restaurantID : int [PK]
  --
  name : String
  location : String
  contact : String [Unique]
}

entity SurplusFood {
  * foodID : int [PK]
  --
  type : String
  quantity : int
  expirationDate : DateTime
  specialInstructions : Text [Optional]
}

entity Recipient {
  * recipientID : int [PK]
  --
  name : String
  location : String
  capacity : int
}

entity Volunteer {
  * volunteerID : int [PK]
  --
  name : String
  availability : Boolean
}

User ||--o{ Restaurant
User ||--o{ Recipient
User ||--o{ Volunteer
Restaurant ||--o{ SurplusFood
Recipient ||--o{ SurplusFood
Volunteer }o--|| SurplusFood
@enduml
```

---

#### **Data Flow Diagrams**

##### **Level-0 DFD**

```plantuml
@startuml
actor "Restaurant" as Donor
actor "Food Bank/NGO" as NGO

rectangle "0.0 Food Helpline System" as FoodHelpline {
}

Donor --> FoodHelpline : Submit Donation
FoodHelpline --> Donor : Confirmation

NGO --> FoodHelpline : Request Food
FoodHelpline --> NGO : Donation Details
@enduml

```

##### **Level-1 DFD**

```plantuml
@startuml
actor USER
database USER_MST

rectangle "3.1 Registration" as Registration {
}

rectangle "3.2 Login" as Login {
}

rectangle "3.3 Forget Password" as ForgetPassword {
}

USER --> Registration : Request for Registration
Registration --> USER : Request Accept/Reject
Registration --> USER_MST : Check for Registration
USER_MST --> Registration : Response

USER --> Login : Request for Login
Login --> USER : Request Accept/Reject
Login --> USER_MST : Check for Login
USER_MST --> Login : Response

USER --> ForgetPassword : Request for password
ForgetPassword --> USER : Request Accept/Reject
ForgetPassword --> USER_MST : Check for new password
USER_MST --> ForgetPassword : Response
@enduml

```

##### **Level-2 DFD**

```plantuml
@startuml
database "Inventory Database" as InventoryDB
rectangle "Info about daily sold items and amount" as InfoSource

rectangle "4.1 Access Sold Items and Inventory Data" as AccessData
rectangle "4.2 Aggregate Inventory Data and Sold Items" as AggregateData
rectangle "4.3 Compute Total Price of Each Item" as ComputePrice
rectangle "4.4 Prepare Management Report" as PrepareReport

InventoryDB --> AccessData : inventory data
AccessData --> InfoSource : sold items

AccessData --> AggregateData : sold items, inventory data
AggregateData --> ComputePrice : inventory and sold items list
ComputePrice --> PrepareReport : inventory and sold items list
PrepareReport --> "Restaurant Manager" : management report
@enduml

```
