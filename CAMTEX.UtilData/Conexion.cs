using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MPED = Microsoft.Practices.EnterpriseLibrary.Data;
using Microsoft.Win32;
using System.Data;
using System.Data.SqlClient;
using System.Data.Common;
using System.Configuration;
using System.Web;


namespace CAMTEX.UtilData
{
    public class Conexion : Desechable
    {
        #region Constantes

        /// <summary>
        /// Clave de acceso al objeto que contiene la especificacion del servidor de base de datos
        /// </summary>
        public static string sKeyServer = "sServer";
        /// <summary>
        /// Clave de acceso al objeto que contiene la especificacion del nonbre de la base de datos
        /// </summary>
        public static string sKeyDatabase = "sDatabase";
        /// <summary>
        /// Clave de acceso al objeto que contiene la especificacion del usuario actual
        /// </summary>
        public static string sKeyUsuario = "sUser";
        /// <summary>
        /// Clave de acceso al objeto que contiene la especificacion de la contraseña actual
        /// </summary>
        public static string sKeyPassword = "sPswdDB";
        /// <summary>
        /// Clave de acceso al objeto que contiene la especificacion del usuario de base de datos
        /// </summary>
        public static string sKeyUsuarioDB = "sUserDB";
        /// <summary>
        /// Clave de acceso al objeto que contiene la especificacion de la contraseña del usuario de base de datos
        /// </summary>
        public static string sKeyPasswordDB = "sPwdDB";
        /// <summary>
        /// Clave de acceso al objeto que contiene la especificacion del codigo del modulo actual
        /// </summary>
        public static string sKeyModCod = "sModCod";
        /// <summary>
        /// Clave de acceso al objeto que contiene la especificacion de la abreviatura del modulo actual
        /// </summary>
        public static string sKeyModAbr = "sModAbr";
        /// <summary>
        /// Clave de acceso al objeto que contiene la especificacion del codigo SGS
        /// </summary>
        public static string sKeySgs = "sSgsCod";
        /// <summary>
        /// Clave de acceso al objeto que contiene la especificacion del codigo de origen actual
        /// </summary>
        public static string sKeyOriCod = "sOriCod";
        /// <summary>
        /// Clave de acceso al objeto que contiene la especificacion del codigo del idioma actual
        /// </summary>
        public static string sKeyIdmCod = "sIdmCod";
        /// <summary>
        /// Clave de acceso al objeto que contiene la especificacion de indicador de encriptacion 
        /// </summary>
        public static string sKeyIndEnc = "sIndEncripta";

        /// <summary>
        /// Indica la clave de la cadena de conexion SLIM TRF
        /// </summary>
        private const string sClaveConexionTRF = "CNXSRVENV";
        /// <summary>
        /// Indica el valor de la clave de la cadena de conexion SLIM TRF Actual
        /// </summary>
        private const string sValorConexionActualTRF = "ACTUAL";
        /// <summary>
        /// Indica el valor de la clave de la cadena de conexion SLIM TRF para la BD Historica
        /// </summary>
        private const string sValorConexionHistoricoTRF = "HISTORICO";

        #endregion

        #region Declaración de Variables

        //private SqlConnection loSqlConnIn;
        //private SqlTransaction loSqlTransaction;
        private MPED.Sql.SqlDatabase loSqlConnIn;
        private string lsAplicacion = string.Empty;
        private string lsSqlDatabase = string.Empty;
        private string lsSqlServer = string.Empty;
        private string lsSqlUser = string.Empty;
        private string lsSqlPassword = string.Empty;

        #endregion

        #region Constructores

        /// <summary>
        /// Constructor por defecto. Se emplea para la conexion con la BD Alterna
        /// </summary>		
        public Conexion()
        {
            obtenerValoresBDConexion("DBSERVER", "DBNAMEPE");
        }

        /// <summary>
        /// Constructor que realiza la conexion a la BD por Defecto
        /// </summary>
        /// <param name="asSqlUser">Usuario de conexion a la BD</param>
        /// <param name="asSqlPassword">Password del usuario de conexion</param>
        public Conexion(string asSqlUser, string asSqlPassword)
        {
            obtenerValoresBDConexion("DBSERVER", "DBNAMEPE");
            conectar(asSqlUser, asSqlPassword);
        }

        /// Constructor a eliminarse, ya que este es llamadao por desarrollo antiguo.
        /// Debe reemplazarse la invocación de este constructor por el contructor 
        /// public Conexion(string asSqlUser, string asSqlPassword)
        /// <summary>
        /// Constructor que realiza la conexion a la BD por Defecto
        /// </summary>
        /// <param name="asSqlUser">Usuario de conexion a la BD</param>
        /// <param name="asSqlPassword">Password del usuario de conexion</param>
        /// <param name="asSqlDB">Base de datos de Conexion</param>
        public Conexion(string asSqlUser, string asSqlPassword, string asSqlDB)
        {
            //if (AppDomain.CurrentDomain.GetData("ApplicationType").ToString() == ApplicationType.Web)
            //{
            //    //Se obtienen parámetros del archivo de configuración
            //    lsSqlServer = ConfigurationManager.AppSettings["DBSERVER"];

            //    if (lsSqlServer == null) lsSqlServer = Convert.ToString(HttpContext.Current.Session[sKeyServer]);
            //}

            //if (AppDomain.CurrentDomain.GetData("ApplicationType").ToString() == ApplicationType.Desktop)
            //{
            //    //Se obtienen parámetros del registro
            //    string sApplication = AppDomain.CurrentDomain.GetData("ApplicationName").ToString();
            //    RegistryKey oRegistryKey = Registry.LocalMachine.OpenSubKey(@"Software\SGS\" + sApplication);
            //    if (oRegistryKey != null) lsSqlServer = oRegistryKey.GetValue("ServerName").ToString();
            //}

            lsSqlServer = ConfigurationManager.AppSettings["DBSERVER"];

            lsSqlDatabase = asSqlDB;
            conectar(asSqlUser, asSqlPassword);
        }

        /// Constructor a eliminarse, ya que este debe ser reemplazado por DBAlter, utilizado por QDescargas
        /// <summary>
        public Conexion(string asSqlUser, string asSqlPassword, string asSqlDB, string asSqlServ)
        {
            string lsName = "";
            switch (AppDomain.CurrentDomain.GetData("ApplicationType").ToString())
            {
                case ApplicationType.Web:
                    System.Web.HttpContext oHttpContext = System.Web.HttpContext.Current;
                    lsName = oHttpContext.Session["sUser"] != null ? oHttpContext.Session["sUser"].ToString().Trim() : "";
                    //asegura la conexion de las apps-web
                    lsSqlServer = lsSqlServer.Length == 0 ? asSqlServ : lsSqlServer;
                    lsSqlDatabase = lsSqlDatabase.Length == 0 ? asSqlDB : lsSqlDatabase;
                    break;

                case ApplicationType.Desktop:
                    lsName = AppDomain.CurrentDomain.GetData("sUser") != null ? AppDomain.CurrentDomain.GetData("sUser").ToString().Trim() : "";
                    break;

                case ApplicationType.WindowsService:
                    lsSqlDatabase = asSqlDB;
                    lsSqlServer = asSqlServ;
                    break;
            }

            //loSqlConnIn = new SqlConnection("Database=" + asSqlDB +
            //                                ";Server=" + asSqlServ +
            //                                ";User ID=" + asSqlUser +
            //                                ";Password=" + asSqlPassword +
            //                                ";Application Name='App=" + lsAplicacion + "; Usr=" + lsName +
            //                                "'" +
            //                                ";Connect Timeout=1500; ");

            string sConexion = string.Format("Database={0};Server={1};User ID={2};Password={3};Application Name={4};Connect Timeout=1500",
                lsSqlDatabase, lsSqlServer, asSqlUser, asSqlPassword, lsAplicacion);

            loSqlConnIn = new Microsoft.Practices.EnterpriseLibrary.Data.Sql.SqlDatabase(sConexion);
        }


        /*JY INI*/
        public Conexion(string asSqlUser, string asSqlPassword, string asSqlDB, string asSqlServ, string sDirecto)
        {

            lsSqlServer = asSqlServ;
            lsSqlDatabase = asSqlDB;
            lsSqlUser = asSqlUser;
            lsSqlPassword = asSqlPassword;

            string sConexion = string.Format("Database={0};Server={1};User ID={2};Password={3};Application Name={4};Connect Timeout=0",
                lsSqlDatabase, lsSqlServer, asSqlUser, asSqlPassword, lsAplicacion);

            loSqlConnIn = new Microsoft.Practices.EnterpriseLibrary.Data.Sql.SqlDatabase(sConexion);
        }
        /*JY FIN*/

        /// <summary>
        /// Asegura que la conexión se cierre
        /// </summary>
        protected override void DisposeTime()
        {
            //if (loSqlTransaction != null)
            //    loSqlTransaction.Dispose();
            //if (loSqlConnIn != null)
            //{
            //    if (loSqlConnIn.State == ConnectionState.Open)
            //        loSqlConnIn.Close();
            //    loSqlConnIn.Dispose();
            //}
        }

        /// <summary>
        /// Destruye los objetos de conexion
        /// </summary>
        protected override void FinalizeTime()
        {
            //loSqlTransaction = null;
            //loSqlConnIn = null;
        }

        #endregion

        #region Métodos

        #region Conexiones

        /// <summary>
        /// Constructor que realiza la conexion a la BD por Defecto
        /// </summary>
        /// <param name="asSqlUser">Usuario de conexion a la BD</param>
        /// <param name="asSqlPassword">Password del usuario de conexion</param>
        public bool IntentaConectar(string asSqlUser, string asSqlPassword)
        {
            bool bExito = true;

            try
            {
                conectar(asSqlUser, asSqlPassword);
                using (DbConnection cnx = loSqlConnIn.CreateConnection())
                {
                    cnx.Open();
                    cnx.Close();
                }
            }
            catch (Exception)
            {
                bExito = false;
            }

            return bExito;
        }

        /// <summary>
        /// Permite realizar la conexion con una BD alterna
        /// Los datos de Conexion se encuentran en al archivo de Configuracion
        /// </summary>
        public void ConexionAlterna()
        {
            obtenerValoresBDConexion("DBSERVERALTER", "DBNAMEALTER");
            obtenerValoresUsuarioConexion("USERALTER", "PSWDALTER");
            conectar(lsSqlUser, lsSqlPassword);
        }

        /// <summary>
        /// Permite realizar la conexion con una BD alterna
        /// El nombre del servidor y de base de datos, se encuentran en al archivo de configuración
        /// </summary>
        /// <param name="asSqlUser">Usuario de conexion a la BD</param>
        /// <param name="asSqlPassword">Password del usuario de conexion</param>
        //public void ConexionAlterna(string asSqlUser, string asSqlPassword)
        //{
        //    obtenerValoresBDConexion("DBSERVERALTER", "DBNAMEALTER");
        //    conectar(asSqlUser, asSqlPassword);
        //}

        /// <summary>
        /// Permite realizar la conexion a la BD de CCLAS
        /// Los datos de Conexion se encuentran en al archivo de Configuracion
        /// </summary>
        public void ConexionCCLAS()
        {
            obtenerValoresBDConexion("DBSERVERCCLAS", "DBNAMECCLAS");
            obtenerValoresUsuarioConexion("USERCCLAS", "PSWDCCLAS");
            conectar(lsSqlUser, lsSqlPassword);
        }

        /// <summary>
        /// Permite realizar la conexion a la BD
        /// Los datos de Conexion se encuentran en al archivo de Configuracion
        /// </summary>
        public void ConexionError()
        {
            obtenerValoresUsuarioConexion("USERERROR", "PSWDERROR");
            conectar(lsSqlUser, lsSqlPassword);
        }

        ///// <summary>
        ///// Cierra la conexión existente de BD
        ///// </summary>
        //public void cerrar()
        //{
        //    if (loSqlConnIn.State == ConnectionState.Open)
        //        loSqlConnIn.Close();
        //}


        private String[] getRegistry()
        {

            String lsAplicacion = AppDomain.CurrentDomain.GetData("ApplicationName").ToString();

            RegistryKey oRegistryKey = null;

            if (ConfigurationManager.AppSettings["Terminal"] != null &&
                ConfigurationManager.AppSettings["Terminal"].ToString().Equals("S"))
            {
                oRegistryKey = crearConexionTerminal(lsAplicacion);
            }
            else
                oRegistryKey = Registry.LocalMachine.OpenSubKey(@"Software\SGS\" + lsAplicacion);

            if (AppDomain.CurrentDomain.GetData("ServerName") != null)
                lsSqlServer = AppDomain.CurrentDomain.GetData("ServerName").ToString();
            else
                lsSqlServer = oRegistryKey.GetValue("ServerName").ToString();


            if (AppDomain.CurrentDomain.GetData("Database") != null)
                lsSqlDatabase = AppDomain.CurrentDomain.GetData("Database").ToString();
            else
                lsSqlDatabase = oRegistryKey.GetValue("Database").ToString();

            //@1 INI
            if (ConfigurationManager.AppSettings["ServiceName"] != null)
            {
                string sServicio = ConfigurationManager.AppSettings["ServiceName"];
                if (sServicio == "QLabRegister")
                {
                    if (AppDomain.CurrentDomain.GetData("NombreServicio") != null)
                        lsAplicacion = AppDomain.CurrentDomain.GetData("NombreServicio").ToString();
                }
            }
            //@1 FIN


            String[] arrCnn = new String[2];
            arrCnn[0] = lsSqlServer;
            arrCnn[1] = lsSqlDatabase;
            this.lsAplicacion = lsAplicacion;

            return arrCnn;
        }

        private String[] getRegistryTRF()
        {
            String lsAplicacion = AppDomain.CurrentDomain.GetData("ApplicationName").ToString();

            RegistryKey oRegistryKey = null;

            if (ConfigurationManager.AppSettings["Terminal"] != null &&
                ConfigurationManager.AppSettings["Terminal"].ToString().Equals("S"))
            {
                oRegistryKey = crearConexionTerminal(lsAplicacion);
            }
            else
            {
                oRegistryKey = Registry.LocalMachine.OpenSubKey(@"Software\SGS\" + lsAplicacion);
            }

            if (Convert.ToString(AppDomain.CurrentDomain.GetData(sClaveConexionTRF)).Equals(sValorConexionHistoricoTRF))
            {
                // conexion a la base de datos historica SLIM
                lsSqlServer = oRegistryKey.GetValue("ServerName_hist").ToString();
                lsSqlDatabase = oRegistryKey.GetValue("Database_hist").ToString();
                lsSqlUser = oRegistryKey.GetValue("UserId_alter").ToString();
                lsSqlPassword = oRegistryKey.GetValue("Psw_alter").ToString();
            }
            else
            {
                lsSqlServer = oRegistryKey.GetValue("ServerName_alter").ToString();
                lsSqlDatabase = oRegistryKey.GetValue("Database_alter").ToString();
                lsSqlUser = oRegistryKey.GetValue("UserId_alter").ToString();
                lsSqlPassword = oRegistryKey.GetValue("Psw_alter").ToString();
            }

            String[] arrCnn = new String[4];
            arrCnn[0] = lsSqlServer;
            arrCnn[1] = lsSqlDatabase;
            arrCnn[2] = lsSqlUser;
            arrCnn[3] = lsSqlPassword;
            this.lsAplicacion = lsAplicacion;

            return arrCnn;
        }

        public RegistryKey crearConexionTerminal(String lsAplicacion)
        {

            //Leer Regedit Local Machine
            RegistryKey oRegistryCurrentUser = null;

            oRegistryCurrentUser = Registry.CurrentUser.OpenSubKey(@"Software\SGS\" + lsAplicacion);

            //Si no existe crea el regedit Current User , toma como base el Local Machine 

            if (oRegistryCurrentUser == null)
            {
                //Crear Regedit Current User
                oRegistryCurrentUser = Registry.CurrentUser.CreateSubKey(@"Software\SGS\" + lsAplicacion);

                //Leer Regedit Local Machine
                RegistryKey oRegistryLocalMachine = Registry.LocalMachine.OpenSubKey(@"Software\SGS\" + lsAplicacion);

                String[] sKeyRegistry = oRegistryLocalMachine.GetValueNames();

                for (int i = 0; i < sKeyRegistry.Length; i++)
                {
                    oRegistryCurrentUser.SetValue(sKeyRegistry[i], oRegistryLocalMachine.GetValue(sKeyRegistry[i]));
                }

                oRegistryCurrentUser.Flush();
                oRegistryLocalMachine.Close();
            }

            return oRegistryCurrentUser;
        }

        /// <summary>
        /// Permite obtener valores de conexión de base de datos desde el Web.config o registro de sistema
        /// </summary>
        /// <param name="sArchivoConfServidor">Nombre de servidor en archivo de configuración o registro.</param>
        /// <param name="sArchivoConfBaseDatos">Nombre de base de datos en archivo de configuración o registro.</param>
        private void obtenerValoresBDConexion(string sArchivoConfServidor, string sArchivoConfBaseDatos)
        {
            if (AppDomain.CurrentDomain.GetData("ApplicationType") == null) return;
            switch (AppDomain.CurrentDomain.GetData("ApplicationType").ToString())
            {
                case ApplicationType.Web:
                    lsSqlServer = ConfigurationManager.AppSettings[sArchivoConfServidor];
                    lsSqlDatabase = ConfigurationManager.AppSettings[sArchivoConfBaseDatos];
                    lsAplicacion = ConfigurationManager.AppSettings["MODABR"];

                    if (string.IsNullOrEmpty(lsSqlServer)) lsSqlServer = Convert.ToString(HttpContext.Current.Session[sKeyServer]);
                    if (string.IsNullOrEmpty(lsSqlDatabase)) lsSqlDatabase = Convert.ToString(HttpContext.Current.Session[sKeyDatabase]);
                    if (string.IsNullOrEmpty(lsSqlUser)) lsSqlUser = Convert.ToString(HttpContext.Current.Session[sKeyUsuario]);
                    if (string.IsNullOrEmpty(lsSqlPassword)) lsSqlPassword = Convert.ToString(HttpContext.Current.Session[sKeyPassword]);
                    if (string.IsNullOrEmpty(lsAplicacion)) lsAplicacion = Convert.ToString(HttpContext.Current.Session[sKeyModAbr]);
                    break;

                case ApplicationType.Desktop:
                    {
                        //Se obtienen parámetros del registro
                        //lsAplicacion = AppDomain.CurrentDomain.GetData("ApplicationName").ToString();
                        //RegistryKey oRegistryKey = Registry.LocalMachine.OpenSubKey(@"Software\SGS\" + lsAplicacion);
                        //if (oRegistryKey != null)
                        //{
                        //    lsSqlServer = oRegistryKey.GetValue("ServerName").ToString();
                        //    lsSqlDatabase = oRegistryKey.GetValue("Database").ToString();
                        //}
                        String[] arrCnn = getRegistry();
                        lsSqlServer = arrCnn[0];
                        lsSqlDatabase = arrCnn[1];

                        break;
                    }


                case ApplicationType.WindowsService:
                    {
                        //Se obtienen parámetros del registro
                        //lsAplicacion = AppDomain.CurrentDomain.GetData("ApplicationName").ToString();
                        //RegistryKey oRegistryKey = Registry.LocalMachine.OpenSubKey(@"Software\SGS\" + lsAplicacion);
                        //if (oRegistryKey != null)
                        //{
                        //    lsSqlServer = oRegistryKey.GetValue(sArchivoConfServidor).ToString();
                        //    lsSqlDatabase = oRegistryKey.GetValue(sArchivoConfBaseDatos).ToString();
                        //}
                        String[] arrCnn = getRegistry();
                        lsSqlServer = arrCnn[0];
                        lsSqlDatabase = arrCnn[1];
                        break;
                    }
            }
        }

        /// <summary>
        /// Permite obtener valores de usuario de conexión desde el Web.config o registro de sistema
        /// </summary>
        /// <param name="sArchivoConfUsuario">Usuario en archivo de configuración o registro.</param>
        /// <param name="sArchivoConfContraseña">Contraseña en archivo de configuración o registro.</param>
        private void obtenerValoresUsuarioConexion(string sArchivoConfUsuario, string sArchivoConfContraseña)
        {
            if (AppDomain.CurrentDomain.GetData("ApplicationType") == null) return;
            switch (AppDomain.CurrentDomain.GetData("ApplicationType").ToString())
            {
                case ApplicationType.Web:
                    lsSqlUser = ConfigurationManager.AppSettings[sArchivoConfUsuario];
                    lsSqlPassword = ConfigurationManager.AppSettings[sArchivoConfContraseña];
                    lsAplicacion = ConfigurationManager.AppSettings["MODABR"];

                    if (lsSqlServer == null) lsSqlServer = Convert.ToString(HttpContext.Current.Session[sKeyServer]);
                    if (lsSqlDatabase == null) lsSqlDatabase = Convert.ToString(HttpContext.Current.Session[sKeyDatabase]);
                    if (lsSqlUser == null) lsSqlUser = Convert.ToString(HttpContext.Current.Session[sKeyUsuarioDB]);
                    if (lsSqlPassword == null) lsSqlPassword = Convert.ToString(HttpContext.Current.Session[sKeyPasswordDB]);
                    if (lsAplicacion == null) lsAplicacion = Convert.ToString(HttpContext.Current.Session[sKeyModAbr]);
                    break;

                case ApplicationType.Desktop:
                    {
                        //Se obtienen parámetros del registro
                        lsAplicacion = AppDomain.CurrentDomain.GetData("ApplicationName").ToString();
                        RegistryKey oRegistryKey = Registry.LocalMachine.OpenSubKey(@"Software\SGS\" + lsAplicacion);
                        if (oRegistryKey != null)
                        {
                            lsSqlUser = oRegistryKey.GetValue(sArchivoConfUsuario).ToString();
                            lsSqlPassword = oRegistryKey.GetValue(sArchivoConfContraseña).ToString();
                        }
                    }
                    break;
                case ApplicationType.WindowsService:
                    {
                        //Se obtienen parámetros del registro
                        lsAplicacion = AppDomain.CurrentDomain.GetData("ApplicationName").ToString();
                        RegistryKey oRegistryKey = Registry.LocalMachine.OpenSubKey(@"Software\SGS\" + lsAplicacion);
                        if (oRegistryKey != null)
                        {
                            lsSqlUser = oRegistryKey.GetValue(sArchivoConfUsuario).ToString();
                            lsSqlPassword = oRegistryKey.GetValue(sArchivoConfContraseña).ToString();
                        }
                    }
                    break;
            }
        }

        public void ConectarTRF()
        {
            String[] arrCnn = getRegistryTRF();
            lsSqlServer = arrCnn[0];
            lsSqlDatabase = arrCnn[1];
            lsSqlUser = arrCnn[2];
            lsSqlPassword = arrCnn[3];

            string sConexion = string.Format("Database={0};Server={1};User ID={2};Password={3};Application Name={4};Connect Timeout=0",
                lsSqlDatabase, lsSqlServer, lsSqlUser, lsSqlPassword, lsAplicacion);

            //        string sConexion = string.Format("Database={0};Server={1};User ID={2};Password={3};Application Name={4};Connect Timeout=0",
            //"PEENVCORE_TRF", "PEDB003\\ins2", "sope001", "123", lsAplicacion);

            loSqlConnIn = new Microsoft.Practices.EnterpriseLibrary.Data.Sql.SqlDatabase(sConexion);
        }

        /// <summary>
        /// Ejecuta la conexión OLEDB contra el servidor de Base de Datos SQL Server
        /// </summary>
        /// <param name="asSqlUser">Usuario</param>
        /// <param name="asSqlPassword">Contraseña</param>
        private void conectar(string asSqlUser, string asSqlPassword)
        {
            //if (AppDomain.CurrentDomain.GetData("ApplicationType") == null) return;

            //string lsName = "";

            //switch (AppDomain.CurrentDomain.GetData("ApplicationType").ToString())
            //{
            //    case ApplicationType.Web:
            //        System.Web.HttpContext oHttpContext = System.Web.HttpContext.Current;
            //        lsName = oHttpContext.Session["sUser"] != null ? oHttpContext.Session["sUser"].ToString().Trim() : "";
            //        break;

            //    case ApplicationType.Desktop:
            //        lsName = AppDomain.CurrentDomain.GetData("sUser") != null ? AppDomain.CurrentDomain.GetData("sUser").ToString().Trim() : "";
            //        break;

            //    case ApplicationType.WindowsService:
            //        lsName = AppDomain.CurrentDomain.GetData("sUser") != null ? AppDomain.CurrentDomain.GetData("sUser").ToString().Trim() : "";
            //        break;
            //}

            //loSqlConnIn = new SqlConnection("Database=" + lsSqlDatabase +
            //                   ";Server=" + lsSqlServer +
            //                   ";User ID=" + asSqlUser +
            //                   ";Password=" + asSqlPassword +
            //                   ";Application Name='App=" + lsAplicacion + "; Usr=" + lsName + "'" +
            //                   ";Connect Timeout=1500; ");

            string sConexion = string.Format("Database={0};Server={1};User ID={2};Password={3};Application Name={4};Connect Timeout=0",
                lsSqlDatabase, lsSqlServer, asSqlUser, asSqlPassword, lsAplicacion);

            loSqlConnIn = new Microsoft.Practices.EnterpriseLibrary.Data.Sql.SqlDatabase(sConexion);
        }

        #endregion

        #region Ejecuciones contra Base de Datos

        /// <summary>
        /// Ejecuta un SQL Query del tipo Select
        /// </summary>
        /// <param name="sQuery">SQL Query</param>
        /// <returns>DataSet con el resultado obtenido del Query</returns>
        public DataSet ejecutarQuery(string sQuery)
        {
            //DataSet ds = loSqlTransaction != null ? SqlHelper.ExecuteDataset(loSqlTransaction, CommandType.Text, sQuery) : SqlHelper.ExecuteDataset(loSqlConnIn, CommandType.Text, sQuery);
            //return ds;

            return loSqlConnIn.ExecuteDataSet(CommandType.Text, sQuery);
        }

        /// <summary>
        /// Ejecuta un SQL Query que no devuelve resultado
        /// </summary>
        /// <param name="sQuery">SQL Query</param>
        public void ejecutarQuerySinRetorno(string sQuery)
        {
            //if (loSqlTransaction != null)
            //{
            //    SqlHelper.ExecuteDataset
            //        (
            //        loSqlTransaction,
            //        CommandType.Text,
            //        sQuery
            //        );
            //}
            //else
            //{
            //    SqlHelper.ExecuteDataset
            //        (
            //        loSqlConnIn,
            //        CommandType.Text,
            //        sQuery
            //        );
            //}

            loSqlConnIn.ExecuteNonQuery(CommandType.Text, sQuery);
        }

        /// <summary>
        /// Ejecuta un procedure y almacena el resultado en un DataReader
        /// </summary>
        /// <param name="sProcedure">Nombre del Stored procedure</param>
        /// <param name="valores">Arreglo con los parametros del stored</param>
        /// <returns>DataReader con el resultado de la Consulta</returns>
        public SqlDataReader ejecutarDataReader(string sProcedure, params object[] valores)
        {
            //return SqlHelper.ExecuteReader(loSqlConnIn, sProcedure, valores);
            return loSqlConnIn.ExecuteReader(sProcedure, valores) as SqlDataReader;
        }

        public System.Xml.XmlReader ejecutarXmlReader(string sProcedure, params object[] valores)
        {
            //return SqlHelper.ExecuteXmlReader(loSqlConnIn, sProcedure, valores);
            return loSqlConnIn.ExecuteXmlReader(loSqlConnIn.GetStoredProcCommand(sProcedure, valores));
        }
        /// <summary>
        /// Ejecuta un procedure y almacena el resultado en un DataSet
        /// </summary>
        /// <param name="sProcedure">Nombre del Stored procedure</param>
        /// <param name="valores">Lista de parametros del stored</param>
        /// <returns>DataSet con el resultado de la Consulta</returns>
        public DataSet ejecutarDataSet(string sProcedure, IDbDataParameter[] parametros)
        {

            DbCommand cmd = loSqlConnIn.GetStoredProcCommand(sProcedure);
            cmd.CommandTimeout = 0;
            cmd.Parameters.AddRange(parametros);


            return loSqlConnIn.ExecuteDataSet(cmd);
        }

        /// <summary>
        /// Ejecuta un procedure y almacena el resultado en un DataTable
        /// </summary>
        /// <param name="sProcedure">Nombre del Stored procedure</param>
        /// <param name="valores">Lista de parametros del stored</param>
        /// <returns>DataSet con el resultado de la Consulta</returns>
        public DataTable ejecutarDataTable(string sProcedure, IDbDataParameter[] parametros)
        {
            DataTable dt = null;
            DbCommand cmd = loSqlConnIn.GetStoredProcCommand(sProcedure);

            cmd.CommandTimeout = 0;
            cmd.Parameters.AddRange(parametros);

            DataSet ds = loSqlConnIn.ExecuteDataSet(cmd);
            if (ds.Tables.Count > 0) dt = ds.Tables[0].Copy();

            return dt;
        }

        private void LlenarParametros(DbCommand cmd, object[] valores)
        {
            int iIndex = 0;

            foreach (DbParameter par in cmd.Parameters)
            {
                switch (par.Direction)
                {
                    case ParameterDirection.Input:
                    case ParameterDirection.InputOutput:
                        if (valores[iIndex] == null)
                        {
                            par.Value = DBNull.Value;
                        }
                        else
                        {
                            par.Value = valores[iIndex];
                        }

                        //iIndex++;
                        break;
                }
            }
        }

        /// <summary>
        /// Ejecuta un procedure y almacena el resultado en una variable.
        /// El Resultado debe ser un numero entero (escalar)
        /// </summary>
        /// <param name="sProcedure">Nombre del Stored procedure</param>
        /// <param name="valores">Lista de Parametros del stored</param>
        /// <returns>string con el valor devuelto por el stored</returns>
        public string ejecutarEscalar(string sProcedure, IDbDataParameter[] parametros)
        {
            //SqlParameter[] arParms = new SqlParameter[valores.Length];

            ////Obtiene los parámetros del procecimiento
            //DataSet ds = obtenerParametros(sProcedure);

            //if (ds.Tables.Count == 0) return null;

            //if (ds.Tables.Count > 0)
            //{
            //    DataTable dt = ds.Tables[0]; //Estructura del Stored                
            //    Int32 i = 0;

            //    foreach (DataRow dr in dt.Rows)
            //    {
            //        //Omite el parámetro de retorno del procedimiento
            //        if (!dr["Parameter_name"].Equals("@RETURN_VALUE"))
            //        {
            //            arParms[i] =
            //                new SqlParameter(dr["Parameter_name"].Tostring(),
            //                                 obtenerSQLType(dr["Type_name"].Tostring()));
            //            arParms[i].Value = valores[i];
            //            i++;
            //        }
            //    }
            //    if (i != valores.Length)
            //        throw new Exception("La cantidad de parámetros del sp " + sProcedure +
            //                            " ingresados no coincide con las del procedimiento.");
            //}

            ////Se verifica si existe una Transaccion de BD activa
            //string sValor;
            //if (loSqlTransaction != null)
            //{
            //    sValor = SqlHelper.ExecuteScalar
            //        (
            //        loSqlTransaction,
            //        CommandType.StoredProcedure,
            //        sProcedure,
            //        arParms
            //        ).Tostring();
            //}
            //else
            //{
            //    sValor = SqlHelper.ExecuteScalar
            //        (
            //        loSqlConnIn,
            //        CommandType.StoredProcedure,
            //        sProcedure,
            //        arParms
            //        ).Tostring();
            //}
            //return sValor;

            DbCommand cmd = loSqlConnIn.GetStoredProcCommand(sProcedure);

            cmd.CommandTimeout = 0;
            cmd.Parameters.AddRange(parametros);
            //loSqlConnIn.DiscoverParameters(cmd);
            //LlenarParametros(cmd, valores);

            return Convert.ToString(loSqlConnIn.ExecuteScalar(cmd));
        }

        /// <summary>
        /// Ejecuta un Procedure que no devuelve ningun resultado
        /// </summary>
        /// <param name="sProcedure">Nombre del Stored procedure</param>
        /// <param name="valores">Lista de Parametros del stored</param>
        public void ejecutarSinRetorno(string sProcedure, params object[] valores)
        {
            //SqlParameter[] arParms = new SqlParameter[valores.Length];

            ////Obtiene los parámetros del procecimiento
            //DataSet ds = obtenerParametros(sProcedure);
            //if (ds.Tables.Count == 0) return;

            //if (ds.Tables.Count > 0)
            //{
            //    DataTable dt = ds.Tables[0]; //Estructura del Stored                
            //    Int32 i = 0;

            //    foreach (DataRow dr in dt.Rows)
            //    {
            //        //Omite el parámetro de retorno del procedimiento
            //        if (!dr["Parameter_name"].Equals("@RETURN_VALUE"))
            //        {
            //            arParms[i] =
            //                new SqlParameter(dr["Parameter_name"].Tostring(),
            //                                 obtenerSQLType(dr["Type_name"].Tostring()));
            //            arParms[i].Value = valores[i];
            //            i++;
            //        }
            //    }
            //    if (i != valores.Length)
            //        throw new Exception("La cantidad de parámetros del sp " + sProcedure +
            //                            " ingresados no coincide con las del procedimiento.");
            //}

            ////Se verifica si existe una Transaccion de BD activa
            //if (loSqlTransaction != null)
            //{
            //    SqlHelper.ExecuteNonQuery
            //        (
            //        loSqlTransaction,
            //        CommandType.StoredProcedure,
            //        sProcedure,
            //        arParms
            //        );
            //}
            //else
            //{
            //    SqlHelper.ExecuteNonQuery
            //        (
            //        loSqlConnIn,
            //        CommandType.StoredProcedure,
            //        sProcedure,
            //        arParms
            //        );
            //}

            DbCommand cmd = loSqlConnIn.GetStoredProcCommand(sProcedure, valores);

            cmd.CommandTimeout = 0;
            //loSqlConnIn.DiscoverParameters(cmd);
            //LlenarParametros(cmd, valores);

            loSqlConnIn.ExecuteNonQuery(cmd);
        }

        ///// <summary>
        ///// Permite realizar la conexion a la BD-Desarrollo de DataMar
        ///// Los datos de Conexion se encuentran en al archivo de Configuracion
        ///// </summary>
        ///// <summary>
        ///// Funcion que devuelve el tipo de dato SqlDbType 
        ///// proveniente de un parametro de stored procedure
        ///// </summary>
        ///// <param name="sNombreTipo">Nombre del Tipo de dato</param>
        ///// <returns>Devuelve el tipo de dato SqlDbType</returns>
        //private static SqlDbType obtenerSQLType(string sNombreTipo)
        //{
        //    SqlDbType tTipo;

        //    switch (sNombreTipo)
        //    {
        //        case "bit":
        //            tTipo = SqlDbType.Bit;
        //            break;

        //        case "char":
        //            tTipo = SqlDbType.Char;
        //            break;

        //        case "varchar":
        //            tTipo = SqlDbType.VarChar;
        //            break;

        //        case "decimal":
        //        case "numeric":
        //            tTipo = SqlDbType.Decimal;
        //            break;

        //        case "float":
        //            tTipo = SqlDbType.Float;
        //            break;

        //        case "bigint":
        //            tTipo = SqlDbType.BigInt;
        //            break;

        //        case "integer":
        //        case "int":
        //            tTipo = SqlDbType.Int;
        //            break;

        //        case "smallint":
        //            tTipo = SqlDbType.SmallInt;
        //            break;

        //        case "tinyint":
        //            tTipo = SqlDbType.TinyInt;
        //            break;

        //        case "datetime":
        //            tTipo = SqlDbType.DateTime;
        //            break;

        //        case "smalldatetime":
        //            tTipo = SqlDbType.SmallDateTime;
        //            break;

        //        case "nchar":
        //            tTipo = SqlDbType.NChar;
        //            break;

        //        case "nvarchar":
        //            tTipo = SqlDbType.NVarChar;
        //            break;

        //        case "image":
        //            tTipo = SqlDbType.Image;
        //            break;

        //        case "xml":
        //            tTipo = SqlDbType.Xml;
        //            break;

        //        case "text":
        //            tTipo = SqlDbType.Text;
        //            break;

        //        case "ntext":
        //            tTipo = SqlDbType.NText;
        //            break;
        //        default:
        //            throw (new Exception("Tipo de dato SQL no soportado:" + sNombreTipo));
        //    }

        //    return tTipo;
        //}

        ///// <summary>
        ///// Obtiene los parametros de los stored Procedure
        ///// utilizando el sp del sistema sp_procedure_params_rowset
        ///// </summary>
        //private DataSet obtenerParametros(string sProcedure)
        //{
        //    SqlParameter[] arParms = {
        //                                 new SqlParameter("@procedure_name", SqlDbType.NChar, 256),
        //                                 new SqlParameter("@group_number", SqlDbType.Int, 4),
        //                                 new SqlParameter("@procedure_schema", SqlDbType.NChar, 256),
        //                                 new SqlParameter("@parameter_name", SqlDbType.NChar, 256)
        //                             };

        //    arParms[0].Value = sProcedure;
        //    arParms[1].Value = DBNull.Value;
        //    arParms[2].Value = "dbo";
        //    arParms[3].Value = DBNull.Value;

        //    DataSet ds;

        //    if (loSqlTransaction != null)
        //    {
        //        ds = SqlHelper.ExecuteDataset
        //            (
        //            loSqlTransaction,
        //            CommandType.StoredProcedure,
        //            "sp_procedure_params_rowset",
        //            arParms
        //            );
        //    }
        //    else
        //    {
        //        ds = SqlHelper.ExecuteDataset
        //            (
        //            loSqlConnIn,

        //            CommandType.StoredProcedure,
        //            "sp_procedure_params_rowset",
        //            arParms
        //            );
        //    }

        //    if (ds.Tables[0].Rows.Count <= 0)
        //        throw new Exception("El stored procedure " + sProcedure +
        //                            " no existe o no tiene permisos para ejecutarlo.");
        //    return ds;
        //}

        #endregion

        //#region Transacciones

        ///// <summary>
        ///// Inicia una Transaccion de Base de Datos
        ///// </summary>
        //public void iniciaTrans()
        //{
        //    loSqlConnIn.Open();
        //    loSqlTransaction = loSqlConnIn.BeginTransaction();
        //}

        ///// <summary>
        ///// Salva de manera Permanente los datos en la BD que hayan sido
        ///// ingresados dentro de una Transaccion
        ///// </summary>
        //public void Commit()
        //{
        //    loSqlTransaction.Commit();
        //    cerrar();
        //}

        ///// <summary>
        ///// Deshace cualquier operacion realizada dentro de una Transaccion
        ///// </summary>
        //public void Rollback()
        //{
        //    loSqlTransaction.Rollback();
        //    cerrar();
        //}

        //#endregion

        #endregion
    }

    public static class ApplicationType
    {
        #region Variables Públicas

        /// <summary>
        /// Indica que estamos en ejecución de un ambiente Windows
        /// </summary>
        public const string Desktop = "Desktop";
        /// <summary>
        /// Indica que estamos en ejecución de un ambiente Windows Service
        /// </summary>
        public const string WindowsService = "WindowsService";
        /// <summary>
        /// Indica que estamos en ejecución de un ambiente Web
        /// </summary>
        public const string Web = "Web";

        #endregion
    }
}
