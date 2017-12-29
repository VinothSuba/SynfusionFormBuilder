using System.ComponentModel.DataAnnotations;

namespace SyncfusionFormBuilder.Models
{
    public class AccountModel
    {
        [StringLength(100)]
        [Display(Name = "Email")]
        [Required(ErrorMessage = "Please enter valid Email")]
        public string Email { get; set; }

        [StringLength(50)]
        [Display(Name = "Password")]
        [Required(ErrorMessage = "Please enter valid password")]
        public string Password { get; set; }

        public string ReturnUrl { get; set; }
    }
}