namespace MaterialsLib
{
    public class Warehouse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        
        public Warehouse(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public override string ToString()
        {
            return $"{Id}, {Name}";
        }
    }
}