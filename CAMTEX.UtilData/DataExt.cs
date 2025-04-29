using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.UtilData
{
    public static class DataExt
    {

        public static T ToEntity<T>(this IDataReader Readers)
        {
            using (IDataReader reader = (IDataReader)Readers)
            {
                var entity = Activator.CreateInstance<T>();
                while (reader.Read())
                {
                    
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        string field = reader.GetName(i);
                        TrySetProperty(entity, field, reader.GetValue(i));
                    }
                  
                }
                return entity;
            }
        }



        private static void TrySetProperty(object obj, string property, object value)
        {
            if (value == DBNull.Value || value == null)
            {
                return;
            }

            var prop = obj.GetType().GetProperty(property, BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);
            if (prop != null && prop.CanWrite)
                prop.SetValue(obj, value, null);
        }
        public static object entities(Type myType, DataRow row, string Name,List<string> Columns) 
        {

            var entity = Activator.CreateInstance(myType);
            string NombreProp = string.Empty;
          
            if ( !(entity.GetType().Name == typeof(List<>).Name))
            {


                if (myType.GetProperties().Count() > 0 && myType.Name != "String" && myType.Name != "DateTime")
                {
                    foreach (var item in myType.GetProperties())
                    {
                        NombreProp = Name +"_" + item.Name;
                        Type st = Nullable.GetUnderlyingType(item.PropertyType) ?? item.PropertyType;
                        if (st.GetProperties().Count() > 0 && st.Name != "String" && st.Name != "DateTime")
                        {
                            var valueReturn = entities(st, row, NombreProp, Columns);
                            item.SetValue(entity, valueReturn, null);
                        }
                        else
                        {
                            if (Columns.Contains(NombreProp))
                            {
                                object safeValue2 = (row[NombreProp] == DBNull.Value) ? null : Convert.ChangeType(row[NombreProp], st);
                                item.SetValue(entity, safeValue2, null);
                            }

                        }
                    }


                }
            }

            return entity;
        }
        public static IEnumerable<T> ToEntitiesList<T>(this DataTable dt)
        {
            var columnNames = dt.Columns.Cast<DataColumn>()
            .Select(c => c.ColumnName)
            .ToList();
            var properties = typeof(T).GetProperties();
            return dt.AsEnumerable().Select(row =>
            {
                var objT = Activator.CreateInstance<T>();
                foreach (var pro in properties)
                {
                    Type t = Nullable.GetUnderlyingType(pro.PropertyType) ?? pro.PropertyType;
                    if (t.GetProperties().Count() > 0 && t.Name != "String" && t.Name != "DateTime" && t.Name != "Byte[]")
                    {
                        var valueReturn = entities(t, row, pro.Name, columnNames); 
                        pro.SetValue(objT, valueReturn, null);
                        /*var objst = Activator.CreateInstance(t);
                        foreach (var item in t.GetProperties())
                        {
                            var nameProperty = pro.Name + "_" + item.Name;
                            if (columnNames.Contains(nameProperty))
                            {
                                Type st = Nullable.GetUnderlyingType(item.PropertyType) ?? item.PropertyType;
                                object safeValue2 = (row[nameProperty] == DBNull.Value) ? null : Convert.ChangeType(row[nameProperty], st);
                                item.SetValue(objst, safeValue2, null);
                                pro.SetValue(objT, objst, null);
                            }
                           
                        }*/
                    }
                    else
                    {
                        if (columnNames.Contains(pro.Name))
                        {
                            object safeValue = (row[pro.Name] == DBNull.Value) ? null : Convert.ChangeType(row[pro.Name], t);
                            pro.SetValue(objT, safeValue, null);
                        }
                    }
                }
                return objT;
            }).ToList();
        }
    }
}
