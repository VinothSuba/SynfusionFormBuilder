using System.Web.Mvc;
using System.IO;
using System.IO.Compression;
using HtmlAgilityPack;
namespace SyncfusionFormBuilder.Controllers
{
    public class FormBuilderController : Controller
    {
        // GET: FormBuilder
        public ActionResult FormBuilder()
        {
            return View();
        }
        [HttpPost]
        public bool saveHtml(string html,string script)
        {
            if (html != "")
            {
                Session["htmFile"] = html;
                Session["script"] = script;
                SaveDocument();
                return true;
            }

            return false;
        }
        public ActionResult Form()
        {
            return View();
        }
        public ActionResult Download()
        {
           string startPath =Server.MapPath("~/HtmlTemplate");
            string zipPath = Server.MapPath("~/ HtmlTemplate");

            ZipFile.CreateFromDirectory(startPath, zipPath);
            return File(Server.MapPath("~/ HtmlTemplate"), "application/zip", "Demo.zip");
        }


        public void SaveDocument()
        {
            HtmlDocument doc = new HtmlDocument();
            using (StreamWriter writetext = new StreamWriter(Server.MapPath("~/HtmlTemplate/scripts/FormBld.txt")))
            {
                writetext.WriteLine(Session["script"] as string);
            }
            if (System.IO.File.Exists(Server.MapPath("~/HtmlTemplate/scripts/FormBld.js")))
            {
                System.IO.File.Delete(Server.MapPath("~/HtmlTemplate/scripts/FormBld.js"));
            }
            System.IO.File.Copy(Server.MapPath("~/HtmlTemplate/scripts/FormBld.txt"), Server.MapPath("~/HtmlTemplate/scripts/FormBld.js"));

            doc.Load(Server.MapPath("~/HtmlTemplate/Demo.html"));
            HtmlNode divNode = doc.DocumentNode.SelectSingleNode("//div[contains(@id,'parent')]");
            string newDiv = Session["htmFile"] != null ? Session["htmFile"] as string : "";
            divNode.InnerHtml = newDiv;
            if (System.IO.File.Exists(Server.MapPath("~/HtmlTemplate/Demo.html")))
            {
                System.IO.File.Delete(Server.MapPath("~/HtmlTemplate/Demo.html"));
            }

            doc.Save(Server.MapPath("~/HtmlTemplate/Demo.html"));

            if (System.IO.File.Exists(Server.MapPath("~/ HtmlTemplate")))
            {
                System.IO.File.Delete(Server.MapPath("~/ HtmlTemplate"));
            }
        }


      
    }
}