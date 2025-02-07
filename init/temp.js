function generateStudents(num) {
    const names = [
        "Rohan Sharma", "Isha Malhotra", "Siddharth Verma", "Neha Yadav", "Aarav Kapoor",
        "Priyanka Mehta", "Varun Chauhan", "Sanya Bansal", "Rishi Gupta", "Ananya Sen",
        "Harshit Joshi", "Tina Chawla", "Kunal Nair", "Radhika Taneja", "Arjun Saxena",
        "Meera Dixit", "Vikram Oberoi", "Swati Trivedi", "Rajeev Khanna", "Divya Rawat",
        "Aditya Menon", "Sneha Sethi", "Gaurav Bhardwaj", "Ishita Rao", "Tanmay Pandey",
        "Simran Thakur", "Rahul Gill", "Pooja Dutta", "Vivek Tripathi", "Tanya Malik",
        "Aniket Choudhary", "Sakshi Chopra", "Chetan Arora", "Nidhi Sinha", "Jatin Rathi",
        "Preeti Rana", "Rachit Batra", "Lavanya Jain", "Mohit Agrawal", "Bhavya Patel",
        "Deepika Vyas", "Alok Grover", "Reema Khatri", "Parth Sheikh", "Kritika Menon",
        "Samar Taneja", "Nisha Das", "Manoj Goyal", "Monika Joshi", "Anirudh Mehta",
        "Ritu Kapoor", "Himanshu Dixit", "Pallavi Malhotra", "Sandeep Oberoi", "Vikas Sharma",
        "Ayesha Tripathi", "Akash Chatterjee", "Sonali Sethi", "Gautam Rana", "Anushka Chawla",
        "Tushar Arora", "Esha Pandey", "Rohan Khanna", "Naveen Gill", "Rachna Yadav",
        "Karan Verma", "Aditi Singh", "Devansh Thakur", "Sonia Nair", "Tanisha Bansal"
    ];
    
    
    

    const hostels = ["bh", "ch", "jh", "BH", "CH", "JH"];
    const students = [];

    for (let i = 0; i < num; i++) {
        let roll_no = 23301 + i; // Roll numbers start from 23201
        let name = names[i];
        let hostel_name = hostels[Math.floor(Math.random() * hostels.length)];

        students.push({ roll_no, name, hostel_name });
    }

    return students;
}

// Generate 62 students
console.log(generateStudents(70));
