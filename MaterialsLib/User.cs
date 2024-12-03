namespace MaterialsLib
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool Admin { get; set; }
        
        public User(int id, string email, string password, bool admin)
        {
            Id = id;
            Email = email;
            Password = password;
            Admin = admin;
        }

        public override string ToString()
        {
            return $"{Id}, {Email}";
        }

        public void ValidateEmail()
        {
            if (!(Email.Contains("@") && Email.Contains(".")))
            {
                throw new ArgumentException("Invalid e-mail address.");
            }
            return;
        }

        public void ValidatePassword()
        {
            if (Password.Length <= 3)
            {
                throw new ArgumentException("Password must be at least 3 characters long.");
            }
            return;
        }
    }
}