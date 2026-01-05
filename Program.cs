var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

//啟用預設檔案支援(伺服器自動循址 index.html)
app.UseDefaultFiles();

//允許讀取靜態網頁檔案
app.UseStaticFiles();

//app.MapGet("/", () => "Hello World!");

app.Run();
