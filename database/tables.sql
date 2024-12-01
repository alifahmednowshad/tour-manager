CREATE TABLE Users (
    user_id NUMBER PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    email VARCHAR2(100) UNIQUE NOT NULL,
    phone VARCHAR2(15),
    role VARCHAR2(20) CHECK (role IN ('admin', 'customer', 'agent')),
    password VARCHAR2(100) NOT NULL
);
CREATE TABLE Destinations (
    destination_id NUMBER PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    location VARCHAR2(100) NOT NULL,
    description VARCHAR2(255),
    price_per_day NUMBER(10, 2) NOT NULL
);
CREATE TABLE Bookings (
    booking_id NUMBER PRIMARY KEY,
    user_id NUMBER REFERENCES Users(user_id),
    destination_id NUMBER REFERENCES Destinations(destination_id),
    booking_date DATE DEFAULT SYSDATE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_amount NUMBER(10, 2),
    status VARCHAR2(20) CHECK (status IN ('booked', 'cancelled', 'completed'))
);
CREATE TABLE Payments (
    payment_id NUMBER PRIMARY KEY,
    booking_id NUMBER REFERENCES Bookings(booking_id),
    payment_date DATE DEFAULT SYSDATE,
    amount NUMBER(10, 2) NOT NULL,
    payment_method VARCHAR2(20) CHECK (payment_method IN ('card', 'cash', 'online')),
    status VARCHAR2(20) CHECK (status IN ('paid', 'pending'))
);
CREATE TABLE Reviews (
    review_id NUMBER PRIMARY KEY,
    user_id NUMBER REFERENCES Users(user_id),
    destination_id NUMBER REFERENCES Destinations(destination_id),
    rating NUMBER CHECK (rating BETWEEN 1 AND 5) NOT NULL,
    comments VARCHAR2(500),
    review_date DATE DEFAULT SYSDATE
);