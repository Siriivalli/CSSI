

/* =====================================================
   FORM FIELD CHECK
   Uses:
   querySelectorAll()
   forEach()
   getAttribute()
===================================================== */

function checkFormFields() {
    var inputs = document.querySelectorAll(
        "#name, #companyName, #phone"
    );
    var valid = true;
    inputs.forEach(function(input) {

        var fieldId = input.getAttribute("id");

        if (input.value.trim() === "") {

            valid = false;

            if (fieldId === "name") {
                alert("Name is required.");
            }

            else if (fieldId === "companyName") {
                alert("Company Name is required.");
            }

            else if (fieldId === "phone") {
                alert("Phone number is required.");
            }

        }

    });

    return valid;
}



/* =====================================================
   NAME VALIDATION
===================================================== */
function validateName() {

    var nameInput = document.getElementById("name");

    var fieldId = nameInput.getAttribute("id");

    var name = nameInput.value.trim();

    if (name === "") {

        return fieldId + " is required.";

    }
    if (!/^[A-Z]/.test(name)) {

        return "Name must start with an uppercase letter.";

    }
    var namePattern = /^[A-Za-z .&']+$/;
    if (!namePattern.test(name)) {

        return "Name can contain only letters, spaces, &, . and '.";

    }
    return "";

}

/* =====================================================
   COMPANY NAME VALIDATION
===================================================== */

function validateCompanyName() {
    var companyName =
        document.getElementById("companyName").value.trim();
    // Company name is mandatory

    if (companyName === "") {

        return "Company Name is required.";

    }
    // First letter must be uppercase

    if (!/^[A-Z]/.test(companyName)) {

        return "Company Name must start with an uppercase letter.";

    }
    /*
       Allowed:

       Letters
       Spaces
       &
       .
       '
    */
    var companyPattern = /^[A-Za-z .&']+$/;

    if (!companyPattern.test(companyName)) {

        return "Company Name can contain only letters, spaces, &, . and '.";

    }
    return "";

}

/* =====================================================
   PHONE VALIDATION
===================================================== */
function validatePhone() {
    var phone =
        document.getElementById("phone").value.trim();
    // Exactly 10 digits
    var phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {

        return "Phone number must contain exactly 10 digits.";

    }

    // Check if all digits are identical

    var allSame = true;


    for (var i = 1; i < phone.length; i++) {

        if (phone[i] !== phone[0]) {

            allSame = false;

            break;

        }

    }


    if (allSame) {

        return "Phone number cannot contain all identical digits.";

    }


    return "";

}



/* =====================================================
   EMAIL VALIDATION
===================================================== */

function validateEmail() {

    var email =
        document.getElementById("email").value.trim();


    // Email is optional

    if (email === "") {

        return "";

    }


    // Count @

    var atCount = 0;


    for (var i = 0; i < email.length; i++) {

        if (email[i] === "@") {

            atCount++;

        }

    }


    // Exactly one @

    if (atCount !== 1) {

        return "Email must contain exactly one @.";

    }


    // Split email

    var parts = email.split("@");

    var beforeAt = parts[0];

    var afterAt = parts[1];


    if (beforeAt === "" || afterAt === "") {

        return "Please enter a valid email address.";

    }


    /* -----------------------------------------------
       Maximum ONE dot before @
    ------------------------------------------------ */

    var dotsBeforeAt = 0;


    for (var j = 0; j < beforeAt.length; j++) {

        if (beforeAt[j] === ".") {

            dotsBeforeAt++;

        }

    }
    if (dotsBeforeAt > 1) {

        return "Email can contain only one dot before @.";

    }


    /* -----------------------------------------------
       Maximum TWO dots after @
    ------------------------------------------------ */

    var dotsAfterAt = 0;


    for (var k = 0; k < afterAt.length; k++) {

        if (afterAt[k] === ".") {

            dotsAfterAt++;

        }

    }


    if (dotsAfterAt > 2) {

        return "Email can contain maximum two dots after @.";

    }


    /* -----------------------------------------------
       Dot cannot be at beginning/end
    ------------------------------------------------ */

    if (
        beforeAt.charAt(0) === "." ||
        beforeAt.charAt(beforeAt.length - 1) === "."
    ) {

        return "Dot cannot be at the beginning or end before @.";

    }


    if (
        afterAt.charAt(0) === "." ||
        afterAt.charAt(afterAt.length - 1) === "."
    ) {

        return "Dot cannot be at the beginning or end after @.";

    }


    /* -----------------------------------------------
       Basic email format
    ------------------------------------------------ */

    var emailPattern =
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+){1,2}$/;


    if (!emailPattern.test(email)) {

        return "Please enter a valid email address.";

    }


    return "";

}



/* =====================================================
   WEBSITE VALIDATION
===================================================== */

function validateWebsite() {

    var website =
        document.getElementById("website").value.trim();


    // Website is optional

    if (website === "") {

        return "";

    }


    /*
       Website must end with:

       .com
       .co
       .in
    */

    var websitePattern =
        /^(https?:\/\/)?(www\.)?[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.(com|co|in)$/i;


    if (!websitePattern.test(website)) {

        return "Website must end with .com, .co or .in.";

    }


    return "";

}



/* =====================================================
   LOGO VALIDATION
===================================================== */

function validateLogo(callback) {

    var logo =
        document.getElementById("companyLogo");


    /* -----------------------------------------------
       Logo is mandatory
    ------------------------------------------------ */

    if (logo.files.length === 0) {

        callback("Company Logo is required.");

        return;

    }


    var file = logo.files[0];


    /* -----------------------------------------------
       Image only
    ------------------------------------------------ */

    if (!file.type.startsWith("image/")) {

        callback("Company Logo must be an image file.");

        return;

    }


    /* -----------------------------------------------
       Maximum logo dimensions
    ------------------------------------------------ */

    var maxWidth = 200;

    var maxHeight = 80;


    var img = new Image();


    img.onload = function() {


        if (
            img.width > maxWidth ||
            img.height > maxHeight
        ) {

            alert(
                "Logo size is too large!\n\n" +
                "Maximum allowed size: 200 x 80 pixels\n" +
                "Uploaded image size: " +
                img.width + " x " +
                img.height + " pixels."
            );


            // Remove invalid file

            logo.value = "";


            callback(
                "Please upload a logo within 200 x 80 pixels."
            );


            return;

        }


        // Logo is valid

        callback("");

    };


    img.src = URL.createObjectURL(file);

}



/* =====================================================
   GENERATE CARD
===================================================== */

function generateCard() {


    /* -----------------------------------------------
       Check mandatory fields using:

       querySelectorAll()
       forEach()
       getAttribute()
    ------------------------------------------------ */

    if (!checkFormFields()) {

        return;

    }


    /* -----------------------------------------------
       Validate Name
    ------------------------------------------------ */

    var nameError = validateName();


    if (nameError !== "") {

        alert(nameError);

        return;

    }



    /* -----------------------------------------------
       Validate Company Name
    ------------------------------------------------ */

    var companyError = validateCompanyName();


    if (companyError !== "") {

        alert(companyError);

        return;

    }



    /* -----------------------------------------------
       Validate Phone
    ------------------------------------------------ */

    var phoneError = validatePhone();


    if (phoneError !== "") {

        alert(phoneError);

        return;

    }



    /* -----------------------------------------------
       Validate Email
    ------------------------------------------------ */

    var emailError = validateEmail();


    if (emailError !== "") {

        alert(emailError);

        return;

    }



    /* -----------------------------------------------
       Validate Website
    ------------------------------------------------ */

    var websiteError = validateWebsite();


    if (websiteError !== "") {

        alert(websiteError);

        return;

    }



    /* -----------------------------------------------
       Validate Logo
    ------------------------------------------------ */

    validateLogo(function(logoError) {


        if (logoError !== "") {

            alert(logoError);

            return;

        }


        /*
           All validations passed.

           Now generate the card.
        */

        createCard();

    });

}



/* =====================================================
   CREATE CARD
===================================================== */

function createCard() {


    /* -----------------------------------------------
       Get form values
    ------------------------------------------------ */

    var name =
        document.getElementById("name").value.trim();


    var education =
        document.getElementById("education").value.trim();


    var designation =
        document.getElementById("Designation").value.trim();


    var companyName =
        document.getElementById("companyName").value.trim();


    var companySubTitle =
        document.getElementById("companySubTitle").value.trim();


    var phone =
        document.getElementById("phone").value.trim();


    var email =
        document.getElementById("email").value.trim();


    var website =
        document.getElementById("website").value.trim();


    var registeredOffice =
        document.getElementById("registeredOffice").value.trim();


    var branchOffice =
        document.getElementById("branchOffice").value.trim();



    /* -----------------------------------------------
       Get card container
    ------------------------------------------------ */

    var card =
        document.getElementById("card");



    /* -----------------------------------------------
       Create card
    ------------------------------------------------ */

    card.innerHTML = `

        <div class="business-card">


            <!-- TOP SECTION -->

            <div class="card-top">


                <!-- LEFT BLUE SECTION -->

                <div class="card-person">

                    <div>

                        <!-- NAME + EDUCATION -->

                        <div class="name-education">

                            <div class="card-name">
                                ${name}
                            </div>


                            ${
                                education !== ""
                                ?
                                `
                                <div class="card-education">
                                    ${education}
                                </div>
                                `
                                :
                                ""
                            }

                        </div>


                        <!-- DESIGNATION -->

                        ${
                            designation !== ""
                            ?
                            `
                            <div class="card-designation">
                                ${designation}
                            </div>
                            `
                            :
                            ""
                        }

                    </div>

                </div>



                <!-- RIGHT COMPANY SECTION -->

                <div class="card-company">


                    <img
                        id="generatedLogo"
                        alt="Company Logo"
                    >


                    <div class="card-company-details">


                        <div class="card-company-name">
                            ${companyName}
                        </div>


                        ${
                            companySubTitle !== ""
                            ?
                            `
                            <div class="card-company-subtitle">
                                ${companySubTitle}
                            </div>
                            `
                            :
                            ""
                        }


                    </div>


                </div>


            </div>



            <!-- CONTACT INFORMATION -->

            <div class="card-contact">


                <!-- PHONE -->

                <div class="contact-row">

                    <span class="contact-icon">
                        ☎
                    </span>

                    <span>
                        +91 ${phone}
                    </span>

                </div>



                <!-- EMAIL -->

                ${
                    email !== ""
                    ?
                    `
                    <div class="contact-row">

                        <span class="contact-icon">
                            ✉
                        </span>

                        <span>
                            ${email}
                        </span>

                    </div>
                    `
                    :
                    ""
                }



                <!-- WEBSITE -->

                ${
                    website !== ""
                    ?
                    `
                    <div class="contact-row">

                        <span class="contact-icon">
                            ⊕
                        </span>

                        <span>
                            ${website}
                        </span>

                    </div>
                    `
                    :
                    ""
                }


            </div>



            <!-- THREE COLOR LINE -->

            <div class="green-line"></div>



            <!-- ADDRESS SECTION -->

            <div class="card-address">


                ${
                    registeredOffice !== ""
                    ?
                    `
                    <div class="address-row">

                        <span class="address-title">
                            Registered Office:
                        </span>

                        <span>
                            ${registeredOffice}
                        </span>

                    </div>
                    `
                    :
                    ""
                }



                ${
                    branchOffice !== ""
                    ?
                    `
                    <div class="address-row">

                        <span class="address-title">
                            Branch Office:
                        </span>

                        <span>
                            ${branchOffice}
                        </span>

                    </div>
                    `
                    :
                    ""
                }


            </div>


        </div>

    `;



    /* -----------------------------------------------
       Display Logo
    ------------------------------------------------ */

    var logoFile =
        document.getElementById("companyLogo").files[0];


    var reader = new FileReader();


    reader.onload = function(event) {

        document.getElementById("generatedLogo").src =
            event.target.result;

    };


    reader.readAsDataURL(logoFile);



    /* -----------------------------------------------
       Scroll to generated card
    ------------------------------------------------ */

    document.getElementById("card").scrollIntoView({

        behavior: "smooth"

    });

}
