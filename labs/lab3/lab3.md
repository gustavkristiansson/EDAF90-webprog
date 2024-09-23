# Reflektionsfrågor
**What is the difference between using "<Link>" and "<NavLink>" in your navigation bar?** Try it: click on a tab and then outside it to move the focus away from the tab. You can also reload the page.
"<Link>" länkar till olika sidor
"<NavLink>" hänger ihop med vilken URL som är aktiv, mer styling options

**What happens if the user writes an invalid uuid in the url?**

Felmeddelande att beställningen inte hittades. Visar fortfarande varukorgen.

**What is the meaning of a leading / in a path, the difference between navigate("view-order/confirm/123e4567-e89b-12d3-a456-426614174000") and navigate("/view-order/confirm/123e4567-e89b-12d3-a456-426614174000").** Try it, look in the browser url field.

/: absolute path
no /: relative path from current location
