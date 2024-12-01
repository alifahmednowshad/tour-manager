INSERT INTO Users VALUES (1, 'Admin User', 'admin@tour.com', '1234567890', 'admin', 'admin123');
INSERT INTO Users VALUES (2, 'John Doe', 'john@tour.com', '9876543210', 'customer', 'john123');
INSERT INTO Users VALUES (3, 'Travel Agent', 'agent@tour.com', '1231231234', 'agent', 'agent123');
INSERT INTO Users VALUES (4, 'Tanvir', 'tanvir@tour.com', '1231231234', 'customer', 'tanvir123');


INSERT INTO Destinations VALUES (1, 'Cox''s Bazar', 'Bangladesh', 'Longest sea beach', 50.00);
INSERT INTO Destinations VALUES (2, 'Sundarbans', 'Bangladesh', 'Largest mangrove forest', 40.00);
INSERT INTO Destinations VALUES (3, 'Grand Canyon', 'USA', 'Majestic canyon views', 150.00);


INSERT INTO Bookings VALUES (1, 2, 1, SYSDATE, TO_DATE('10-DEC-2024', 'DD-MON-YYYY'), TO_DATE('15-DEC-2024', 'DD-MON-YYYY'), 250.00, 'booked');
INSERT INTO Bookings VALUES (2, 2, 2, SYSDATE, TO_DATE('01-JAN-2025', 'DD-MON-YYYY'), TO_DATE('05-JAN-2025', 'DD-MON-YYYY'), 200.00, 'cancelled');


INSERT INTO Payments VALUES (1, 1, SYSDATE, 250.00, 'card', 'paid');
INSERT INTO Payments VALUES (2, 2, SYSDATE, 200.00, 'online', 'pending');




INSERT INTO Reviews (review_id, user_id, destination_id, rating, comments)
VALUES (1, 2, 1, 5, 'Beautiful beach! Loved the experience.');

INSERT INTO Reviews (review_id, user_id, destination_id, rating, comments)
VALUES (2, 2, 2, 4, 'Peaceful and serene forest.');

INSERT INTO Reviews (review_id, user_id, destination_id, rating, comments)
VALUES (3, 4, 1, 5, 'An amazing getaway at Cox''s Bazar! Highly recommended.');

INSERT INTO Reviews (review_id, user_id, destination_id, rating, comments)
VALUES (4, 4, 3, 3, 'The Grand Canyon is stunning, but a bit crowded.');

INSERT INTO Reviews (review_id, user_id, destination_id, rating, comments)
VALUES (5, 3, 2, 4, 'Sundarbans is a gem of nature!');
       