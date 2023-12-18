using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UnicodePropertyAddress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Properties",
                type: "varchar(300)",
                nullable: true,
                collation: "LATIN1_GENERAL_100_CI_AS_SC_UTF8",
                oldClrType: typeof(string),
                oldType: "varchar(300)",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Properties",
                type: "varchar(300)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(300)",
                oldNullable: true,
                oldCollation: "LATIN1_GENERAL_100_CI_AS_SC_UTF8");
        }
    }
}
