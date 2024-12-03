namespace MaterialsLib
{
    public class Material
    {
        public int Id { get; set; }
        public int WarehouseNo {get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int Amount { get; set; }
        public string? Description { get; set; }
        public string? PictureURL { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public User CreatedBy { get; set; }
        public List<Log> Changelogs { get; set; }

        public Material(int id, int warehouseno, string name, string type, int amount, string? description, string? pictureurl, User createdBy)
        {
            Id = id;
            WarehouseNo = warehouseno;
            Name = name;
            Type = type;
            Amount = amount;
            Description = description;
            PictureURL = pictureurl;
            CreatedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
            CreatedBy = createdBy;
            Changelogs = new List<Log>();

        }

        public override string ToString()
        {
            return $"Warehouse {WarehouseNo}, {Name}, {Type}, {Amount}, {Description}, {PictureURL}, {CreatedAt}, {UpdatedAt}, {CreatedBy.Email}";
        }

        public void ValidateName()
        {
            if (Name.Length < 1)
            {
                throw new ArgumentException("Name is a required field.");
            }
            return;
        }

        public void ValidateType()
        {
            if (Type.Length < 1)
            {
                throw new ArgumentException("Type is a required field.");
            }
            return;
        }

        public void ValidateAmount()
        {
            if (Amount < 0)
            {
                throw new ArgumentOutOfRangeException("Amount must be a positive integer.");
            }
            return;
        }
    }
}