using System.Globalization;
using dict_react.Database;
using dict_react.Services;
using dict_react.Services.Interfaces;
using dict_react.Services.Validation;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationContext>();
builder.Services.AddSingleton<ILocalizationService, LocalizationService>();
builder.Services.AddScoped<IPhrasesService, PhrasesService>();
builder.Services.AddScoped<ICategoriesService, CategoriesService>();
builder.Services.AddScoped<ISentencesService, SentencesService>();
builder.Services.AddScoped<IFilesService, FilesService>();
builder.Services.AddScoped<UniqueFileName>();
builder.Services.AddControllersWithViews();
builder.Services.AddSwaggerGen();
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");
builder.Services.Configure<RequestLocalizationOptions>(
    options =>
    {
        var supportedCultures = new List<CultureInfo>
        {
            new CultureInfo("en"),
            new CultureInfo("ru")
        };

        options.DefaultRequestCulture = new RequestCulture("ru");
        options.SupportedCultures = supportedCultures;
        options.SupportedUICultures = supportedCultures;
        options.AddInitialRequestCultureProvider(new AcceptLanguageHeaderRequestCultureProvider());
        options.RequestCultureProviders = new List<IRequestCultureProvider>
        {
            new QueryStringRequestCultureProvider(),
            new CookieRequestCultureProvider()
        };
    }
);

var app = builder.Build();

var localizeOptions = app.Services.GetService<IOptions<RequestLocalizationOptions>>();
app.UseRequestLocalization(localizeOptions!.Value);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();



app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
