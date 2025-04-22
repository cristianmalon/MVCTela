using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace MVCBase.Util
{
    public static class Utiles
    {
        public static MvcHtmlString LayoutDataTableToHTML(DataTable dt)
        {
            string html = "<table id='gridLayout' class='table table-bordered'>";
            html += "<thead>";
            //add header row
            html += "<tr class='parent-grid-row'>";
            for (int i = 0; i < dt.Columns.Count; i++)
                html += "<th scope='col'>" + dt.Columns[i].ColumnName + "</th>";
            html += "</tr></thead>";
            //add rows
            html += "<tbody>";
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                html += "<tr scope='row' class='parent-grid-row'>";
                for (int j = 0; j < dt.Columns.Count; j++)
                {

                    var td = dt.Rows[i][j].ToString() == String.Empty ? "" : dt.Rows[i][j].ToString().Split('|')[0];
                    var color = dt.Rows[i][j].ToString() == String.Empty ? "#FFFFFF" : dt.Rows[i][j].ToString().Split('|')[1];

                    html += "<td class='parent-grid-column' bgcolor='" + color + "' >" + td + "</td>";
                }
                html += "</tr>";
            }
            html += "</tbody>";
            html += "</table>";

            MvcHtmlString MvcHtmlString = new MvcHtmlString(html);

            return MvcHtmlString;
        }

        public static Dictionary<string, object> GetErrorsFromModelState(System.Web.Mvc.ModelStateDictionary modelStateDictionary)
        {
            var errors = new Dictionary<string, object>();
            foreach (var key in modelStateDictionary.Keys)
            {
                if (modelStateDictionary[key].Errors.Count > 0)
                {
                    errors[key] = modelStateDictionary[key].Errors;
                }
                //// Only send the errors to the client.
                //if (!key.ToLowerInvariant().Contains('.'))
                //{

                //}
            }

            return errors;
        }

        public static String MessageUpdateSuccess() { return "La informacion ha sido actualizada correctamente."; }
        public static String MessageSaveSuccess() { return "La informacion ha sido registrada correctamente."; }
        public static String MessageDeleteuccess() { return "La informacion ha sido Eliminada."; }
        public static String MessageUserExists(String username) { return "El nombre de usuario '" + username + "' ya existe."; }
        public static String MessageServerError() { return "Ocurrio un problema, intentelo nuevamente."; }
        public static String MessageModelStateInvalid() { return "No se pudo registrar la informacion."; }
        public static String MessageFileSaveError(String filename) { return "Error: El archivo " + filename + " no pudo ser guardado"; }

        public static byte[] ConversionImagen(string nombrearchivo)
        {
            //Declaramos fs para poder abrir la imagen.
            FileStream fs = new FileStream(nombrearchivo, FileMode.Open);
            // Declaramos un lector binario para pasar la imagen
            // a bytes
            BinaryReader br = new BinaryReader(fs);
            byte[] imagen = new byte[(int)fs.Length];
            br.Read(imagen, 0, (int)fs.Length);
            br.Close();
            fs.Close();
            File.Delete(nombrearchivo);
            return imagen;
        }
    }
}