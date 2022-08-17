
async function fund(amount) { 
    await 
    this.balance += amount; 
} 
function withdraw(amount) { 
    if (amount <= this.balance) { 
        this.balance -= amount; 
    } 
    if (amount > this.balance) { 
        print("Insufficient funds"); 
    } 
} 
function withdraw(amount) { 
    if (amount <= this.balance) { 
        this.balance -= amount; 
    } 
    if (amount > this.balance) { 
        print("Insufficient funds"); 
    } 
} 

