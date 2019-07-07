DROP TABLE IF EXISTS mydata.datatest;

-- create table --
------------------
CREATE TABLE mydata.datatest
AS
SELECT
    generate_series(1, 800) AS id,
    '' AS choice, 
    '' AS logical_op, 
    '' AS discipline,
    '' AS database,
    'a' AS level,
    0::int as time_as,
    0::int as hours_per_week,
    0 AS salary, 
    '' AS play_games,
    (array [ 'Austria',
        'Belgium',
        'Bulgaria',
        'Cyprus',
        'Czech Republic',
        'Czech Republic',
        'Croatia',
        'Denmark',
        'Denmark',
        'Estonia',
        'Finland',
        'Finland',
        'France',
        'France',
        'Germany',
        'Germany',
        'Greece',
        'Greece',
        'Hungary',
        'Hungary',
        'Ireland',
        'Italy',
        'Italy',
        'Latvia',
        'Lithuania',
        'Luxembourg',
        'Malta',
        'Netherlands',
        'Netherlands',
        'Poland',
        'Poland',
        'Portugal',
        'Portugal',
        'Romania',
        'Romania',
        'Slovakia',
        'Slovenia',
        'Spain',
        'Spain',
        'Sweden',
        'Sweden',
        'UK',
        'UK' ]) [ floor(random() * 43 + 1) ] AS country,
    '' As country_code
    ;

update mydata.datatest set country_code = CASE
        WHEN country = 'Austria' THEN 'AT'
        WHEN country = 'Belgium' THEN 'BE'
        WHEN country = 'Bulgaria' THEN 'BG'
        WHEN country = 'Cyprus' THEN 'CY'
        WHEN country = 'Czech Republic' THEN 'CZ'
        WHEN country = 'Croatia' THEN 'HR'
        WHEN country = 'Denmark' THEN 'DK'
        WHEN country = 'Estonia' THEN 'EE'
        WHEN country = 'Finland' THEN 'FI'
        WHEN country = 'France' THEN 'FR'
        WHEN country = 'Germany' THEN 'DE'
        WHEN country = 'Greece' THEN 'EL'
        WHEN country = 'Hungary' THEN 'HU'
        WHEN country = 'Ireland' THEN 'IE'
        WHEN country = 'Italy' THEN 'IT'
        WHEN country = 'Latvia' THEN 'LV'
        WHEN country = 'Lithuania' THEN 'LT'
        WHEN country = 'Luxembourg' THEN 'LU'
        WHEN country = 'Malta' THEN 'MT'
        WHEN country = 'Netherlands' THEN 'NL'
        WHEN country = 'Poland' THEN 'PL'
        WHEN country = 'Portugal' THEN 'PT'
        WHEN country = 'Romania' THEN 'RO'
        WHEN country = 'Slovakia' THEN 'SK'
        WHEN country = 'Slovenia' THEN 'SI'
        WHEN country = 'Spain' THEN 'ES'
        WHEN country = 'Sweden' THEN 'SE'
        WHEN country = 'UK' THEN 'UK'
        END;

-- Levels --
------------
WITH section AS (
	SELECT * FROM mydata.datatest
	ORDER BY random()
	LIMIT 400)
UPDATE mydata.datatest AS a SET level = 'junior' from section AS b WHERE a.id = b.id;

WITH section AS (
	SELECT * FROM mydata.datatest
	WHERE level = 'a'
	ORDER BY random()
	LIMIT 300)
UPDATE mydata.datatest AS a SET level = 'mid' from section AS b WHERE a.id = b.id;

WITH section AS (
	SELECT * FROM mydata.datatest
	WHERE level = 'a'
	ORDER BY random()
	LIMIT 100)
UPDATE mydata.datatest AS a SET level = 'senior' from section AS b WHERE a.id = b.id;

-- with series as (
-- select generate_series(8, 28)
-- )
UPDATE mydata.datatest SET time_as = 
    CASE
        WHEN level = 'junior' THEN (array[0,0,1,1,2,2,3,3,4])[floor(random()* 9 + 1)] 
        WHEN level = 'mid' THEN (array[4,4,5,5,6,6,7,7,8,9,10])[floor(random()* 11 + 1)] 
        WHEN level = 'senior' THEN (array(select generate_series(8, 28)))[floor(random()* 20 + 1)]
        END;


with random_time as (
SELECT generate_series(1,800) as id, random_between(30,45)
FROM generate_series(1,800))
update mydata.datatest as a SET hours_per_week = b.random_between from random_time as b where a.id = b.id ;


-- Disciplines --
-----------------
UPDATE
    mydata.datatest
SET
    discipline = (array [ 'JavaScript', 'JavaScript', 'JavaScript', 'JavaScript', 'JavaScript', 'JavaScript', 'JavaScript',
        'HTML/CSS', 'HTML/CSS', 'HTML/CSS', 'HTML/CSS', 'HTML/CSS',
        'SQL','SQL','SQL','SQL','SQL',
        'Python', 'Python', 'Python', 'Python',
        'Shell', 'Shell',
        'Java', 'Java', 'Java', 'Java',
        'C#', 'C#', 'C#',
        'C++', 'C++',
        'PHP', 'PHP', 'PHP',
        'C', 'C' ]) [ floor(random() * 37 + 1) ];

-- Database --
-----------------
UPDATE
    mydata.datatest
SET
    database = (array [ 'MySQL', 'MySQL', 'MySQL',
        'SQL Server', 'SQL Server',
        'PostgreSQL','PostgreSQL',
        'MongoDB',
        'SQLite',
        'Redis',
        'Oracle']) [ floor(random() * 11 + 1) ];


-- Salaries --
--------------
CREATE OR REPLACE FUNCTION random_between (low INT, high INT)
    RETURNS INT
AS $$
BEGIN
    RETURN floor(random() * (high - low + 1) + low);
END;
$$
language 'plpgsql' STRICT;

UPDATE mydata.datatest SET salary =  round(random_between(28259,36275), -1) 
	WHERE level = 'junior';
UPDATE mydata.datatest SET salary =  round(random_between(36275,59197), -1) 
	WHERE level = 'mid';
UPDATE mydata.datatest SET salary =  round(random_between(59197,89197), -1) 
	WHERE level = 'senior';


-- Play Games --
----------------
UPDATE mydata.datatest SET play_games =  (array ['yes', 'no']) [ floor(random() * 2 + 1) ];


-- Choice --
------------
UPDATE
    mydata.datatest
SET
    choice = 
        (array ['TRUE', 'FALSE']) [ floor(random() * 2 + 1) ] 
        where level = 'junior';
    ;

UPDATE
    mydata.datatest
SET
    choice = 
        (array ['TRUE', 'FALSE', 'FALSE']) [ floor(random() * 3 + 1) ] 
        where level = 'mid';
    ;

UPDATE
    mydata.datatest
SET
    choice = 
        (array ['TRUE', 'FALSE', 'FALSE', 'FALSE']) [ floor(random() * 4 + 1) ] 
        where level = 'senior';


-- Logical_operators --
-----------------------
UPDATE
    mydata.datatest
SET
    logical_op = 
        (array ['AND', 'AND', 'OR', 'OR', 'OR', 'OR', 'NOT', 'NOT', 'NOT']) [ floor(random() * 9 + 1) ]
    ;

UPDATE mydata.datatest set logical_op = 'NOT' where country = 'Ireland';

ALTER TABLE mydata.datatest
    add primary key (id);



COPY mydata.datatest TO '/Users/liamoconnor/codein/ifed-milestone-no2/data/mydata.csv' DELIMITER ',' CSV HEADER;
