-- Find the item that has minimum weight. 
SELECT * FROM items ORDER BY iweight LIMIT 1;


-- Find the diffrent warehouses in 'pune'. 
SELECT * FROM warehouses WHERE location='pune';


-- Find the details of items ordered by a customer 'john';
SELECT i.ino, i.idescription, i.iweight, i.icost
FROM items i LEFT JOIN items_orders ON i.ino=items_orders.ino
LEFT JOIN orders ON orders.ono=items_orders.ono
INNER JOIN customer ON customer.cno=orders.cno WHERE customer.cname='john';


-- Find a warehouse which has maximum stores. 
SELECT w.wid, w.wname, w.location, count(w.wid) AS store_count 
FROM warehouses w LEFT JOIN stores s  ON w.wid=s.wid 
GROUP BY w.wid, w.wname, w.location 
ORDER BY store_count DESC LIMIT 1;


-- Find an item which is ordered for a minimum number of times.
SELECT i.ino, i.idescription, i.iweight, i.icost, count(i.ino) AS ordered_count 
FROM items i LEFT JOIN items_orders ON i.ino=items_orders.ino 
LEFT JOIN orders ON orders.ono=items_orders.ono 
GROUP BY i.ino, i.idescription, i.iweight, i.icost 
ORDER BY ordered_count LIMIT 1;


-- Find the detailed orders given by each customer.
SELECT c.cno, c.cname, c.address, c.c_city, o.odate, i.idescription, i.iweight, i.icost, COUNT(i.ino) AS iquantity 
FROM customer c INNER JOIN orders o ON c.cno=o.cno
LEFT JOIN items_orders ON items_orders.ono=o.ono
LEFT JOIN items i ON i.ino=items_orders.ino  
GROUP BY c.cno, c.cname, c.address, c.c_city, o.odate, i.idescription, i.iweight, i.icost;