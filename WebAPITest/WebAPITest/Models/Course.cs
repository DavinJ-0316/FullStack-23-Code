namespace WebAPITest.Models
{
    public class Course: BaseModel
    {
        public string CourseName { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
  
        public Category Category { get; set; }

       
        
    }
}
