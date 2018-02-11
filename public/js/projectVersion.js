
function dropZoneSuccess(uploadedVersionConfFile) {
    // suppress all rows in the body
    // Only one file can be droppped in the dropzone

    $("#" + uploadedVersionConfFile + " > tbody").empty();

    for (var j = 0; j < response.results.length; j++) {
        var result = response.results[j];
        console.log(result.originalFileName)
        for (var k = 0; k < result.lines.length; k++) {

            $('#' + uploadedVersionConfFile + ' > tbody:last-child')
                .append($('<tr>')
                    .append($('<td>')
                        .append($('<input>', {
                            type: 'text',
                            name: 'repository',
                            value: String(result.lines[k].repository)
                        })
                        )
                    )
                    .append($('<td>')
                        .append($('<input>', {
                            type: 'text',
                            name: 'repository',
                            value: String(result.lines[k].tag)
                        })
                        )
                    )
                )
        }
    }

}

function initDropZones() {
    Dropzone.options.dropZoneInitialId = {
        dictDefaultMessage: "Please drop your Project Initial Version configuration file here",
        accept: function (file, done) {
            console.log("file uploaded");
            done();
        },
        init: function () {
            this.on("addedfile", function () {
                // ensure that only one file is dropped
                if (this.files[1] != null) {
                    this.removeFile(this.files[0]);
                }
            });
        },
        success: function (file, response) {
            console.log(file.name);
            dropZoneSuccess("uploadedInitialVersionConfFile");

        }
    };
    Dropzone.options.dropZoneFinalId = {
        dictDefaultMessage: "Please drop your Project Final Version configuration file here",
        accept: function (file, done) {
            console.log("file uploaded");
            done();
        },
        init: function () {
            this.on("addedfile", function () {
                // Only one file can be droppped in the dropzone
                // ensure that only one file is dropped

                if (this.files[1] != null) {
                    this.removeFile(this.files[0]);
                }
            });
        },
        success: function (file, response) {
            console.log(file.name);

            dropZoneSuccess("uploadedFinalVersionConfFile");

        }
    };
}



function fillVersionSelect(myProjects, selectedProject) {

    var oneTwoVersion = document.querySelector('input[name="versionNumber"]:checked').value;
    console.log("one or two versions= " + String(oneTwoVersion));
    if (String(oneTwoVersion) == '1') {

        fillOneVersion(myProjects, selectedProject, "versionInit");
        $("#versionFinal").hide();
        $("#drop-zone-final").hide();
        $("#td-final-version-conf-file").hide();

    } else {
        $("#versionFinal").show();
        $("#drop-zone-final").show();
        $("#td-final-version-conf-file").show();

        fillOneVersion(myProjects, selectedProject, "versionInit");
        fillOneVersion(myProjects, selectedProject, "versionFinal");

    }
}

function fillOneVersion(myProjects, selectedProject, versionId) {

    for (var j = 0; j < myProjects.length; j++) {

        //console.log(myProjects[j].name);
        if (selectedProject == myProjects[j].name) {
            console.log("selected project is = " + myProjects[j].name);
            $("#" + String(versionId)).empty();
            var versionsArray = myProjects[j].versions;
            for (var k = 0; k < versionsArray.length; k++) {
                $("#" + String(versionId)).append($('<option>', {
                    value: versionsArray[k].version,
                    text: versionsArray[k].version
                }));
            }
        }
    }
}

function radioVersionNumberClicked() {
    console.log("radio number of versions clicked");
    console.log(document.querySelector('input[name="versionNumber"]:checked').value);
    radioProjectClicked();
}