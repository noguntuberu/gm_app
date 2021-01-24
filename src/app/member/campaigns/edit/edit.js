import React from 'react';
import CampaignEditForm from './form';
import { useParams } from 'react-router-dom';

const EditCampaign = () => {
    const { id } = useParams();
    const tinymce_config = {
        content_css: 'create.css',
        autoresize_bottom_margin: 25,
        autoresize_overflow_padding: 25,
        default_link_target: "_blank",
        file_picker_callback: () => {

        },
        file_picker_types: 'file',
        fullpage_default_doctype: "<!DOCTYPE html>",
        fullpage_default_encoding: "UTF-8",
        height: 500,
        images_reuse_filename: true,
        images_upload_url: 'http://localhost:5000/campaigns/uploads/image',
        image_uploadtab: true,
        menubar: '',
        placeholder: 'Create a campaign...',
        plugins: 'autolink autosave code fullpage fullscreen hr image imagetools link lists preview spellchecker wordcount quickbars',
        toolbar: `preview  code  fullscreen | undo redo | formatselect fontsizeselect | bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | numlist bullist  blockquote |
        quickimage link hr restoredraft  spellchecker wordcount`,
        toolbar_mode: 'floating',
        toolbar_sticky: true,
    }

    return <CampaignEditForm campaign_id={id} config={tinymce_config} />
}

export default EditCampaign;