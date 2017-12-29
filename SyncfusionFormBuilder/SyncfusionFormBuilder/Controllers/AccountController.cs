using System;
using System.Collections.Generic;
using System.Linq;
using SyncfusionFormBuilder.Models;
using System.Web.Mvc;

namespace SyncfusionFormBuilder.Controllers
{
    public class AccountController : Controller
    {
        [HttpGet]
        public ActionResult Login()
        {
            return View(new AccountModel());
        }

        // GET: Account
        [HttpPost]
        public ActionResult Login(AccountModel accountsModel)
        {
            try
            {
                var user = IsValidUser(accountsModel.Email, accountsModel.Password);

                if (user)
                {
                   
                    return RedirectToAction("FormBuilder", "FormBuilder");
                }

                ModelState.AddModelError("Password", "Invalid username or password");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("Password", "Invalid");
            }

            return View(accountsModel);

        }

        public ActionResult Logout()
        {
            this.Response.Cookies.Clear();
            this.Session.Clear();
            return RedirectToAction("Login", "account");
        }

        public bool IsValidUser(string userName, string passowrd)
        {
 
            List<UserCredential> users = new List<UserCredential>();
            var userDetail = new UserCredential();
            userDetail.userName = "user@formbuilder.com";
            userDetail.passWord = "School@123";
            users.Add(userDetail);

            var userDetail1 = new UserCredential();
            userDetail1.userName = "syncfusion@gmail.com";
            userDetail1.passWord = "School@123";
            users.Add(userDetail1);
            var x = users.Where(a => a.userName == userName && a.passWord == passowrd).FirstOrDefault();

            if (users.Where(a => a.userName == userName && a.passWord == passowrd).FirstOrDefault() != null)
                return true;
            else
                return false;
          
        }

        public  class UserCredential
        {
            public string userName { get; set; }
            public string passWord { get; set;}
        }
    }
}