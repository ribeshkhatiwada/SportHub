using Microsoft.EntityFrameworkCore.Migrations;

namespace sporthub.Migrations
{
    public partial class Addednewcolumncalledteamid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TeamId",
                table: "User",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "User");
        }
    }
}
