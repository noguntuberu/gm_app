import React from 'react';
import { useSelector } from 'react-redux';

import CampaignCreationForm from './form';
import { autoCompleter } from './auto-complete';
import * as FileService from '../../../../services/file';

const CreateCampaign = () => {
    const { token } = useSelector(state => state.user_data);

    const uploadImage = (blobInfo, success, failure, progress) => {
        const data = new FormData();
        data.append('image', blobInfo.blob());

        //
        FileService.uploadTinyMCEImage(success, failure, progress, { data, token });
    }

    const tinymce_config = {
        content_css: 'create.css',
        autoresize_bottom_margin: 25,
        autoresize_overflow_padding: 25,
        browser_spellcheck: true,
        default_link_target: "_blank",
        file_picker_callback: () => {

        },
        file_picker_types: 'file',
        fullpage_default_doctype: "<!DOCTYPE html>",
        fullpage_default_encoding: "UTF-8",
        height: 500,
        images_reuse_filename: true,
        images_upload_handler: uploadImage,
        image_uploadtab: true,
        menubar: false,
        placeholder: 'Create a campaign...',
        plugins: 'autolink autosave code fullpage fullscreen hr image imagetools link lists preview spellchecker wordcount quickbars',
        setup: autoCompleter,
        toolbar: ` preview  code  fullscreen | undo redo | formatselect fontsizeselect | bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | numlist bullist  blockquote |
            quickimage link hr restoredraft  spellchecker wordcount`,
        toolbar_mode: 'sliding',
        toolbar_sticky: false,

    }

    return <div className="content-wrapper form-area mt-3">
        <CampaignCreationForm config={tinymce_config} />
    </div>
}

export default CreateCampaign;