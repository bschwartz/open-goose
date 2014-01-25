$(document).ready ->

  # Handle clicking on a folder in the sidebar
  window.folderHandler = ->
    $('li.folder').click (e) ->
      path = $(this).attr 'data-path'
      renderFolder path
      currentState = "#{location.pathname}?path=#{path}"
      history.replaceState(currentState, currentState, currentState)


  # Handle clicking on a file in the sidebar
  window.fileHandler = ->
    $('li.file').click (e) ->
      path = $(this).attr 'data-path'
      goose.readFile path, (content) ->
        renderFile path, content
        currentState = "#{location.pathname}?path=#{paht}"
        history.replaceState(currentState, currentState, currentState)


  # Render the sidebar for a specific folder
  window.renderFolder = (folder) ->
    goose.readDir folder, (files) ->
      fileNames = []
      for file in files
        if file.isFolder
          fileNames.push "<li class=\"folder\" data-path=\"#{file.path}\">#{file.name}</li>"
        else
          fileNames.push "<li class=\"file\" data-path=\"#{file.path}\">#{file.name}</li>"

      $('#sidebar').html "<ul>#{fileNames.join('')}</ul>"
      $('#content').html ''


  # Render the content for a specific file
  window.renderFile = (file, content) ->
    $('#content').html content


  window.load = ->
    if location.href.endsWith('/')
      href = location.href.substring(0, location.href.length - 1)
      query_params = href.split('?')[1]
      if query_params
        path = query_params.match(/path=([^#&]+)/)[1]
      else
        path = '/'

      renderFolder path
    else
      href = location.href
      query_params = href.split('?')[1]
      if query_params
        path = query_params.match(/path=([^#&]+)/)[1]
      else
        path = '/'

      renderFile path


  load()
  fileHandler()
  folderHandler()


