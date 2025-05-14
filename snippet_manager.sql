-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 14, 2025 at 05:31 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `snippet_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `shared_snippets`
--

CREATE TABLE `shared_snippets` (
  `id` bigint(20) NOT NULL,
  `snippet_id` bigint(20) DEFAULT NULL,
  `shared_user_id` bigint(20) DEFAULT NULL,
  `permission` enum('Read','Write') NOT NULL DEFAULT 'Read'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `shared_snippets`
--

INSERT INTO `shared_snippets` (`id`, `snippet_id`, `shared_user_id`, `permission`) VALUES
(1, 2, 1, 'Write'),
(2, 10, 1, 'Read'),
(4, 12, 2, 'Write'),
(5, 12, 5, 'Read'),
(6, 14, 3, 'Write'),
(7, 14, 5, 'Write'),
(8, 18, 3, 'Read'),
(9, 18, 4, 'Read'),
(10, 19, 1, 'Read'),
(11, 19, 2, 'Read'),
(12, 20, 1, 'Write'),
(13, 20, 2, 'Write'),
(14, 25, 2, 'Read'),
(15, 25, NULL, 'Read'),
(16, 26, 3, 'Read'),
(17, 27, 4, 'Read'),
(18, 28, 5, 'Read'),
(19, 29, 5, 'Write');

-- --------------------------------------------------------

--
-- Table structure for table `snippets`
--

CREATE TABLE `snippets` (
  `id` bigint(20) NOT NULL,
  `language` varchar(255) DEFAULT NULL,
  `code_snippet` text NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `collaboration` enum('No','Yes') NOT NULL DEFAULT 'No'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `snippets`
--

INSERT INTO `snippets` (`id`, `language`, `code_snippet`, `user_id`, `collaboration`) VALUES
(10, 'Ruby', 'number = 10\nif number > 5\n  puts \"The number is greater than 5\"\nelsif number == 5\n  puts \"The number is equal to 5\"\nelse\n  puts \"The number is less than 5\"\nend', 3, 'Yes'),
(13, 'Python', '# Python Program to find the area of triangle\n\na = 5\nb = 6\nc = 7\n\n# Uncomment below to take inputs from the user\n# a = float(input(\'Enter first side: \'))\n# b = float(input(\'Enter second side: \'))\n# c = float(input(\'Enter third side: \'))\n\n# calculate the semi-perimeter\ns = (a + b + c) / 2\n\n# calculate the area\narea = (s*(s-a)*(s-b)*(s-c)) ** 0.5\nprint(\'The area of the triangle is %0.2f\' %area)', 4, 'No'),
(14, 'Java', 'class Main {\n    public static int sum(int num) {\n        return num + num;\n    }\n\n    public static void main(String[] args) {\n        int result;\n        result = square(10);\n        System.out.println(\"Squared value of 10 is: \" + result);\n    }\n}', 4, 'Yes'),
(15, 'Python', 'a = 10\nb = 5\nprint(\"Addition:\", a + b);\nprint(\"Subtraction:\", a - b);\nprint(\"Multiplication:\", a * b);\nprint(\"Division:\", a / b);', 3, 'No'),
(17, 'Python', 'a = 10\nb = 5\nprint(\"Addition:\", a + b)\nprint(\"Subtraction:\", a - b)\nprint(\"Multiplication:\", a * b)\nprint(\"Division:\", a / b)', 1, 'No'),
(18, 'Python', 'age = 20\nif age >= 18:\n    print(\"Eligible to vote\")\nelse:\n    print(\"Not eligible to vote\")', 1, 'Yes'),
(20, 'C++', '#include <iostream>\n#include <string>\n\nint main() {\n  int age = 30;\n  double salary = 50000.50;\n  char initial = \'J\';\n  std::string name = \"John Doe\";\n  bool isEmployed = true;\n\n  std::cout << \"Name: \" << name << std::endl;\n  std::cout << \"Age: \" << age << std::endl;\n  std::cout << \"Salary: \" << salary << std::endl;\n  stdctd::cout << \"Initial: \" << initial << std::endl;\n  std::cout << \"Is Employed: \" << isEmployed << std::endl;\n  return 0;\n}', 5, 'Yes'),
(21, 'C++', 'C++ code', 1, 'No'),
(22, 'C++', '#include <iostream>\n\nint main() {\n    int numbers[5] = {10, 20, 30, 40, 50};\n\n    for (int i = 0; i < 5; ++i) {\n        std::cout << \"Element at index \" << i << \": \" << numbers[i] << std::endl;\n    }\n\n    return 0;\n}', 1, 'No'),
(23, 'C++', '#include <iostream>\n#include <string>\n\nstruct Person {\n    std::string name;\n    int age;\n    double salary;\n};\n\nint main() {\n    Person person1;\n    person1.name = \"Alice\";\n    person1.age = 25;\n    person1.salary = 55000.00;\n\n    std::cout << \"Name: \" << person1.name << std::endl;\n    std::cout << \"Age: \" << person1.age << std::endl;\n    std::cout << \"Salary: \" << person1.salary << std::endl;\n\n    return 0;\n}', 1, 'No'),
(24, 'C++', '#include <iostream>\n#include <string>\n\nstruct Person {\n    std::string name;\n    int age;\n    double salary;\n};\n\nint main() {\n    Person person1;\n    person1.name = \"Alice\";\n    person1.age = 25;\n    person1.salary = 55000.00;\n\n    std::cout << \"Name: \" << person1.name << std::endl;\n    std::cout << \"Age: \" << person1.age << std::endl;\n    std::cout << \"Salary: \" << person1.salary << std::endl;\n\n    return 0;\n}', 1, 'No'),
(25, 'Ruby', 'def greet(name)\n  puts \"Hello, #{name}!\"\nend\n\ngreet(\"Bob\") # Output: Hello, Bob!', 1, 'Yes'),
(26, 'Ruby', 'class Dog\n  def initialize(name, breed)\n    @name = name\n    @breed = breed\n  end\n\n  def bark\n    puts \"Woof!\"\n  end\n\n  def get_name\n    return @name\n  end\nend\n\nmy_dog = Dog.new(\"Buddy\", \"Golden Retriever\")\nputs my_dog.get_name # Output: Buddy\nmy_dog.bark # Output: Woof!', 1, 'Yes'),
(27, 'JavaScript', 'let message = \"This is a string\";\nlet count = 10; // Number\nlet isTrue = true; // Boolean\nlet myArray = [1, 2, 3]; // Array\nlet myObject = { name: \"John\", age: 30 }; // Object\nlet myNull = null; // Null\nlet myUndefined; // Undefined', 1, 'Yes'),
(28, 'JavaScript', 'for (let i = 0; i < 5; i++) {\n  console.log(i); // Outputs 0, 1, 2, 3, 4\n}\n\nlet j = 0;\nwhile (j < 3) {\n  console.log(j); // Outputs 0, 1, 2\n  j++;\n}', 1, 'Yes'),
(29, 'JavaScript', '<!DOCTYPE html>\n<html>\n<head>\n<title>DOM Example</title>\n</head>\n<body>\n  <p id=\"myParagraph\">Original Text</p>\n  <button onclick=\"changeText()\">Change Text</button>\n<script>\nfunction changeText() {\n  document.getElementById(\"myParagraph\").innerHTML = \"New Text\";\n}\n</script>\n</body>\n</html>', 1, 'Yes'),
(30, 'JavaScript', '\"let message = \"\"Hello\"\"; // String\nlet count = 10; // Number\nlet isTrue = true; // Boolean\nlet items = [\"\"apple\"\", \"\"banana\"\"]; // Array\nlet person = { name: \"\"John\"\", age: 30 }; // Object\"', 6, 'No'),
(31, 'Java', '\"public class AddNumbers {\n    public static void main(String[] args) {\n        int num1 = 5;\n        int num2 = 10;\n        int sum = num1 + num2;\n        System.out.println(\"\"Sum of \"\" + num1 + \"\" and \"\" + num2 + \"\" is: \"\" + sum);\n    }\n}\"', 6, 'No'),
(32, 'Java', '\"public class EvenOdd {\n    public static void main(String[] args) {\n        int num = 5;\n        if (num % 2 == 0) {\n            System.out.println(num + \"\" is even.\"\");\n        } else {\n            System.out.println(num + \"\" is odd.\"\");\n        }\n    }\n}\"', 1, 'No');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`) VALUES
(1, 'Shreya', 'Rai', 'shreya@gmail.com', '12345678'),
(2, 'Simran', 'Goel', 'simran@gmail.com', '12345678'),
(3, 'Umang', 'Reddy', 'umang@gmail.com', '12345678'),
(4, 'Gayatri', 'Jain', 'gayatri@gmail.com', '12345678'),
(5, 'Tanya', 'Tiwari', 'tanya@gmail.com', '12345678'),
(6, 'Komal', 'Malhotra', 'komal@gmail.com', '12345678');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `shared_snippets`
--
ALTER TABLE `shared_snippets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `snippets`
--
ALTER TABLE `snippets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `shared_snippets`
--
ALTER TABLE `shared_snippets`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `snippets`
--
ALTER TABLE `snippets`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
