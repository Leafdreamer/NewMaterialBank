namespace MaterialsLib
{
    public class Log
    {
        public string LogData { get; set; }
        public User Editor { get; set; }
        public DateTime EditTime { get; set; }
        
        public Log(string logdata, User editor, DateTime editTime)
        {
            LogData = logdata;
            Editor = editor;
            EditTime = editTime;
        }

        public override string ToString()
        {
            return $"{LogData}, {Editor}";
        }
    }
}